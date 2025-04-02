import admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import serviceAccount from '../config/serviceAccount.json' assert { type: 'json' };

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decodedToken = await getAuth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};