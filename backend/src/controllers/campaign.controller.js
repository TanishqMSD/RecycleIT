import Campaign from '../models/campaign.model.js';

// Create a new campaign
export const createCampaign = async (req, res) => {
  try {
    const { title, description, banner, location, date, endDate, tags } = req.body;
    const campaign = new Campaign({
      title,
      description,
      banner,
      location,
      date,
      endDate,
      tags
    });
    await campaign.save();
    res.status(201).json(campaign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all campaigns
export const getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get campaign by ID
export const getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update campaign
export const updateCampaign = async (req, res) => {
  try {
    const { title, description, banner, location, date, endDate, status, tags } = req.body;
    const campaign = await Campaign.findById(req.params.id);
    
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }


    campaign.title = title || campaign.title;
    campaign.description = description || campaign.description;
    campaign.banner = banner || campaign.banner;
    campaign.location = location || campaign.location;
    campaign.date = date || campaign.date;
    campaign.endDate = endDate || campaign.endDate;
    campaign.status = status || campaign.status;
    campaign.tags = tags || campaign.tags;

    const updatedCampaign = await campaign.save();
    res.json(updatedCampaign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete campaign
export const deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }


    await campaign.remove();
    res.json({ message: 'Campaign deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update participant status
export const updateParticipantStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const campaign = await Campaign.findById(req.params.id);
    
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    campaign.status = status;
    await campaign.save();
    res.json(campaign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};