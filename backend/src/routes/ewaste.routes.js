import express from 'express';
const router = express.Router();
import ewasteController from '../controllers/ewaste.controller.js';

// Route for analyzing e-waste device images
router.post('/analyze', ewasteController.analyzeImage);

export default router;