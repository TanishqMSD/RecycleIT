const mongoose = require('mongoose');

const eduContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true,
    trim: true
  },
  images: [{
    url: String,
    caption: String
  }],
  category: {
    type: String,
    required: true,
    enum: ['Research', 'News', 'Guide', 'Tutorial', 'Report']
  },
  tags: [{
    type: String,
    trim: true
  }],
  author: {
    type: String,
    required: true
  },
  publishDate: {
    type: Date,
    default: Date.now
  },
  lastModified: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  references: [{
    title: String,
    url: String
  }],
  footer: {
    type: String,
    trim: true
  },
  metadata: {
    readTime: Number,
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced']
    },
    featured: {
      type: Boolean,
      default: false
    }
  }
});

module.exports = mongoose.model('EduContent', eduContentSchema);