import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';

const ScanPage = () => {
  const [step, setStep] = useState(1);
  const [deviceImage, setDeviceImage] = useState(null);
  const [deviceDescription, setDeviceDescription] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDeviceImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScan = async () => {
    setIsAnalyzing(true);
    try {
      const formData = new FormData();
      const imageFile = await fetch(deviceImage).then(r => r.blob());
      formData.append('image', imageFile);

      const response = await fetch('http://localhost:3000/api/ewaste/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze image');
      }

      const analysisResult = await response.json();
      setScanResult({
        recyclable: analysisResult.recyclable,
        components: analysisResult.materials.map(m => `${m.name} (${m.percentage}%) - ${m.toxicity} toxicity`),
        environmentalImpact: analysisResult.environmentalImpact,
        recyclingInstructions: analysisResult.recyclingProcess,
        nearbyRecyclers: analysisResult.nearbyRecyclers,
      });
      setStep(2);
    } catch (error) {
      console.error('Error analyzing image:', error);
      alert('Failed to analyze image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`flex items-center ${num !== 3 ? 'flex-1' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= num ? 'bg-green-500' : 'bg-gray-600'} transition-colors duration-200`}
              >
                {num}
              </div>
              {num !== 3 && (
                <div
                  className={`flex-1 h-1 mx-4 ${step > num ? 'bg-green-500' : 'bg-gray-600'} transition-colors duration-200`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Device Input */}
        {step === 1 && (
          <motion.div
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            className="bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-green-400 mb-6">Scan Your Device</h2>
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="block text-gray-300">Upload Device Image</label>
                <div
                  className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-green-500 transition-colors duration-200"
                  onClick={() => document.getElementById('imageInput').click()}
                >
                  {deviceImage ? (
                    <img
                      src={deviceImage}
                      alt="Device"
                      className="max-h-48 mx-auto rounded-lg"
                    />
                  ) : (
                    <div className="text-gray-500">
                      <p>Click to upload or drag and drop</p>
                      <p className="text-sm">PNG, JPG up to 10MB</p>
                    </div>
                  )}
                  <input
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-gray-300">Device Description</label>
                <textarea
                  className="w-full bg-gray-700 rounded-lg p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:outline-none"
                  rows="4"
                  placeholder="Describe your device (e.g., model, condition, age)"
                  value={deviceDescription}
                  onChange={(e) => setDeviceDescription(e.target.value)}
                />
              </div>

              <button
                className={`w-full py-3 rounded-lg font-semibold ${deviceImage && deviceDescription ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-600 cursor-not-allowed'} transition-colors duration-200`}
                onClick={handleScan}
                disabled={!deviceImage || !deviceDescription || isAnalyzing}
              >
                {isAnalyzing ? 'Analyzing...' : 'Start Scan'}
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Results */}
        {step === 2 && scanResult && (
          <motion.div
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-green-400 mb-6">Device Analysis Results</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Recyclability Status</h3>
                    <div className={`text-lg ${scanResult.recyclable ? 'text-green-400' : 'text-red-400'}`}>
                      {scanResult.recyclable ? 'Recyclable' : 'Not Recyclable'}
                    </div>
                  </div>

                  <div className="bg-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Components</h3>
                    <ul className="list-disc list-inside text-gray-300">
                      {scanResult.components.map((component, index) => (
                        <li key={index}>{component}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Environmental Impact</h3>
                    <p className="text-gray-300">{scanResult.environmentalImpact}</p>
                  </div>

                  <div className="bg-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Recycling Instructions</h3>
                    <p className="text-gray-300">{scanResult.recyclingInstructions}</p>
                  </div>
                </div>
              </div>

              <button
                className="mt-6 w-full py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition-colors duration-200"
                onClick={() => setStep(3)}
              >
                Find Recyclers
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Recyclers */}
        {step === 3 && scanResult && (
          <motion.div
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            className="bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-green-400 mb-6">Nearby Certified Recyclers</h2>
            
            <div className="space-y-4">
              {scanResult.nearbyRecyclers.map((recycler, index) => (
                <div
                  key={index}
                  className="bg-gray-700 rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-white">{recycler.name}</h3>
                    <p className="text-gray-400">{recycler.distance}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-2">★</span>
                    <span className="text-gray-300">{recycler.rating}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="mt-6 w-full py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition-colors duration-200"
              onClick={() => setStep(1)}
            >
              Scan Another Device
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ScanPage;