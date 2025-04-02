import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { auth, signInWithPhoneNumber, signInWithGoogle } from '../firebase/firebase';
import { RecaptchaVerifier } from 'firebase/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import recyclingIllustration from '../assets/recycling-illustration.svg';

const AuthLayout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [authMethod, setAuthMethod] = useState('email');
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const [verificationId, setVerificationId] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (authMethod === 'phone' && !window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'normal',
        callback: () => {},
        'expired-callback': () => {
          window.recaptchaVerifier.render().then(widgetId => {
            window.recaptchaVerifier.reset(widgetId);
          });
        }
      });
      window.recaptchaVerifier.render();
    }
  }, [authMethod]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      } else {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
      }
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneAuth = async () => {
    setError('');
    setLoading(true);

    try {
      const phoneNumber = formData.phone;
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setVerificationId(confirmationResult.verificationId);
    } catch (err) {
      setError(err.message);
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.render().then(widgetId => {
          window.recaptchaVerifier.reset(widgetId);
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    setError('');
    setLoading(true);

    try {
      const credential = await auth.signInWithCredential(
        auth.PhoneAuthProvider.credential(verificationId, verificationCode)
      );
      if (credential.user) {
        navigate('/');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      await signInWithGoogle();
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <div className="hidden lg:flex lg:w-1/2 bg-green-50 items-center justify-center p-12">
        <img src={recyclingIllustration} alt="Recycling Illustration" className="max-w-full h-auto" />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg space-y-6">
          <div className="flex justify-center mb-8">
            <h1 className="text-3xl font-bold text-green-800">RecycleIT</h1>
          </div>
          
          <h2 className="text-2xl font-bold text-center mb-6">
            {isRegistering ? 'Register' : 'Login'}
          </h2>

          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setAuthMethod('email')}
              className={`flex-1 py-2 px-4 rounded-lg transition-colors ${authMethod === 'email' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Email
            </button>
            <button
              onClick={() => setAuthMethod('phone')}
              className={`flex-1 py-2 px-4 rounded-lg transition-colors ${authMethod === 'phone' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Phone
            </button>
          </div>

          {authMethod === 'email' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegistering && (
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              )}
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isRegistering ? 'Register' : 'Login'}
              </button>
            </form>
          )}

          {authMethod === 'phone' && (
            <div className="space-y-4">
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number (+1234567890)"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <div id="recaptcha-container"></div>
              {!verificationId ? (
                <button
                  onClick={handlePhoneAuth}
                  disabled={loading}
                  className={`w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Send Code
                </button>
              ) : (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Verification Code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                  <button
                    onClick={handleVerifyCode}
                    disabled={loading}
                    className={`w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Verify Code
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="mt-4 text-center">
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-green-600 hover:underline"
            >
              {isRegistering
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </button>
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className={`w-full bg-white border-2 border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <p className="mt-8 text-center text-sm text-gray-600">
            Join our community of eco-conscious individuals making a difference, one recycling action at a time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;