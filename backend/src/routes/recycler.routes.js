import express from 'express';
import { getNearbyRecyclers } from '../controllers/recycler.controller.js';

const router = express.Router();

router.post('/nearby', getNearbyRecyclers);

export default router;