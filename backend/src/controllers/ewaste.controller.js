import multer from 'multer';
import path from 'path';
// Configure multer for image upload
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedExtensions = /\.(jpg|jpeg|png)$/i;
    const allowedMimeTypes = ['image/jpeg', 'image/png'];
    const extname = allowedExtensions.test(file.originalname);
    const mimetype = allowedMimeTypes.includes(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
}).single('image');

// E-waste materials database (simplified version)
const eWasteMaterials = {
  smartphone: {
    materials: [
      { name: 'Gold', percentage: 0.034, toxicity: 'Low', value: 'High' },
      { name: 'Silver', percentage: 0.34, toxicity: 'Low', value: 'Medium' },
      { name: 'Copper', percentage: 13, toxicity: 'Low', value: 'Medium' },
      { name: 'Palladium', percentage: 0.015, toxicity: 'Medium', value: 'High' },
      { name: 'Lead', percentage: 0.6, toxicity: 'High', value: 'Low' },
      { name: 'Mercury', percentage: 0.002, toxicity: 'Very High', value: 'Low' },
      { name: 'Plastics', percentage: 56, toxicity: 'Medium', value: 'Low' },
    ],
    recyclingProcess: 'Disassembly, component separation, material recovery through chemical and mechanical processes',
    environmentalImpact: 'High due to toxic materials and energy-intensive manufacturing',
  },
  laptop: {
    materials: [
      { name: 'Gold', percentage: 0.024, toxicity: 'Low', value: 'High' },
      { name: 'Silver', percentage: 0.2, toxicity: 'Low', value: 'Medium' },
      { name: 'Copper', percentage: 14, toxicity: 'Low', value: 'Medium' },
      { name: 'Lead', percentage: 1.2, toxicity: 'High', value: 'Low' },
      { name: 'Mercury', percentage: 0.005, toxicity: 'Very High', value: 'Low' },
      { name: 'Plastics', percentage: 42, toxicity: 'Medium', value: 'Low' },
    ],
    recyclingProcess: 'Manual disassembly, PCB extraction, material separation and recovery',
    environmentalImpact: 'High due to hazardous materials and complex components',
  },
  motherboard: {
    materials: [
      { name: 'Gold', percentage: 0.039, toxicity: 'Low', value: 'High' },
      { name: 'Silver', percentage: 0.156, toxicity: 'Low', value: 'Medium' },
      { name: 'Copper', percentage: 20, toxicity: 'Low', value: 'Medium' },
      { name: 'Lead', percentage: 2.2, toxicity: 'High', value: 'Low' },
      { name: 'Palladium', percentage: 0.01, toxicity: 'Medium', value: 'High' },
      { name: 'Plastics', percentage: 28, toxicity: 'Medium', value: 'Low' },
    ],
    recyclingProcess: 'PCB shredding, material separation through advanced sorting technologies',
    environmentalImpact: 'Very high due to concentrated precious and hazardous materials',
  },
};

class EWasteController {
  constructor() {
    // Initialize controller
    this.analyzeImage = this.analyzeImage.bind(this);
  }

  analyzeImage(req, res) {
    try {
      // Handle file upload
      upload(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        }

        if (!req.file) {
          return res.status(400).json({ error: 'No image file uploaded' });
        }

        try {
          // Simple device type detection based on file name and metadata
          const fileName = req.file.originalname.toLowerCase();
          let deviceType = 'unknown';
          let description = 'Unknown electronic device';
          
          // Basic device type detection based on filename keywords
          if (fileName.includes('laptop') || fileName.includes('notebook')) {
            deviceType = 'laptop';
            description = 'A portable computer device';
          } else if (fileName.includes('phone') || fileName.includes('mobile')) {
            deviceType = 'smartphone';
            description = 'A mobile electronic device';
          } else if (fileName.includes('board') || fileName.includes('pcb')) {
            deviceType = 'motherboard';
            description = 'A computer circuit board';
          }

          // Get e-waste information
          const deviceInfo = eWasteMaterials[deviceType] || eWasteMaterials.smartphone; // Fallback to smartphone if unknown

          // Prepare response
          const analysisResult = {
            deviceType,
            description,
            confidence: 0.8, // Fixed confidence score for simplified analysis
            materials: deviceInfo.materials,
            recyclingProcess: deviceInfo.recyclingProcess,
            environmentalImpact: deviceInfo.environmentalImpact,
            recyclable: true,
            nearbyRecyclers: [
              { name: 'EcoRecycle Center', distance: '2.5 miles', rating: 4.5 },
              { name: 'GreenTech Recycling', distance: '3.8 miles', rating: 4.2 },
            ],
          };

          res.json(analysisResult);
        } catch (error) {
          console.error('Error analyzing image:', error);
          res.status(500).json({ error: 'Error analyzing image' });
        }
      });
    } catch (error) {
      console.error('Error handling request:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new EWasteController();