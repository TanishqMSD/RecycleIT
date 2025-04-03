import express from 'express';
import { createCampaign, getCampaigns, getCampaignById, updateCampaign, deleteCampaign, updateParticipantStatus } from '../controllers/campaign.controller.js';
import { authenticateUser } from '../middleware/auth.middleware.js';

const router = express.Router();

// Campaign routes
router.post('/campaigns', authenticateUser, createCampaign);
router.get('/campaigns', getCampaigns);
router.get('/campaigns/:id', getCampaignById);
router.put('/campaigns/:id', authenticateUser, updateCampaign);
router.delete('/campaigns/:id', authenticateUser, deleteCampaign);
router.put('/campaigns/:id/participate', authenticateUser, updateParticipantStatus);

export default router;