import express from 'express';
import { createOrUpdateUser, getCurrentUser } from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// Auth routes
router.post('/auth', verifyToken, createOrUpdateUser);
router.get('/me', verifyToken, getCurrentUser);

export default router;