const express = require('express');
const router = express.Router();
const eduContentController = require('../controllers/eduContentController');

// Create new educational content
router.post('/', eduContentController.create);

// Get all educational content with filters
router.get('/', eduContentController.getAll);

// Get featured content
router.get('/featured', eduContentController.getFeatured);

// Get single educational content
router.get('/:id', eduContentController.getById);

// Update educational content
router.put('/:id', eduContentController.update);

// Delete educational content
router.delete('/:id', eduContentController.delete);

module.exports = router;