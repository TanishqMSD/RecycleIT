import express from 'express';
import { createCampaign, getCampaigns, getCampaignById, updateCampaign, deleteCampaign, updateParticipantStatus } from '../controllers/campaign.controller.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';

const router = express.Router();

// Campaign routes
router.post('/campaigns', isAuthenticated, createCampaign);
router.get('/campaigns', getCampaigns);
router.get('/campaigns/:id', getCampaignById);
router.put('/campaigns/:id', isAuthenticated, updateCampaign);
router.delete('/campaigns/:id', isAuthenticated, deleteCampaign);
router.put('/campaigns/:id/participate', isAuthenticated, updateParticipantStatus);

export default router;