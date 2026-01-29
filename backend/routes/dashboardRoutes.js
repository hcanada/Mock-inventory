import express from 'express';
import { getSummary, getCharts } from '../controllers/dashboardController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/summary', protect, getSummary);
router.get('/charts', protect, getCharts);

export default router;
