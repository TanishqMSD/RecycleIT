const EduContent = require('../models/EduContent');

const eduContentController = {
  // Create new educational content
  async create(req, res) {
    try {
      const eduContent = new EduContent({
        ...req.body,
        author: req.body.author || 'Admin',
        publishDate: new Date(),
        lastModified: new Date()
      });
      await eduContent.save();
      res.status(201).json(eduContent);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all educational content with filters
  async getAll(req, res) {
    try {
      const { category, status, featured } = req.query;
      const query = {};
      
      if (category) query.category = category;
      if (status) query.status = status;
      if (featured) query['metadata.featured'] = featured === 'true';

      const content = await EduContent.find(query)
        .sort({ publishDate: -1 });
      res.json(content);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get single educational content by ID
  async getById(req, res) {
    try {
      const content = await EduContent.findById(req.params.id);
      if (!content) {
        return res.status(404).json({ message: 'Content not found' });
      }
      res.json(content);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update educational content
  async update(req, res) {
    try {
      const content = await EduContent.findById(req.params.id);
      if (!content) {
        return res.status(404).json({ message: 'Content not found' });
      }

      const updatedContent = await EduContent.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          lastModified: new Date()
        },
        { new: true }
      );
      res.json(updatedContent);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete educational content
  async delete(req, res) {
    try {
      const content = await EduContent.findById(req.params.id);
      if (!content) {
        return res.status(404).json({ message: 'Content not found' });
      }
      await content.remove();
      res.json({ message: 'Content deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get featured content
  async getFeatured(req, res) {
    try {
      const featuredContent = await EduContent.find({
        'metadata.featured': true,
        status: 'published'
      })
        .sort({ publishDate: -1 })
        .limit(5);
      res.json(featuredContent);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = eduContentController;