import User from '../models/user.model.js';
import admin from 'firebase-admin';

export const createOrUpdateUser = async (req, res) => {
  try {
    const { name, email, phoneNumber, authProvider } = req.user;
    
    let user = await User.findOne({ email });
    
    if (!user) {
      user = await User.create({
        name,
        email,
        phoneNumber,
        authProvider,
        score: 0,
        pledgeTaken: false
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error in createOrUpdateUser:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating/updating user',
      error: error.message
    });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const { email } = req.user;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error in getCurrentUser:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message
    });
  }
};