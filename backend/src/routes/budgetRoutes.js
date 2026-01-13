import express from 'express';
import {
  getBudget,
  saveBudget,
  getAllBudgets,
  deleteBudget
} from '../controllers/budgetController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

router.get('/:month/:year', getBudget);
router.post('/:month/:year', saveBudget);
router.get('/', getAllBudgets);
router.delete('/:month/:year', deleteBudget);

export default router;
