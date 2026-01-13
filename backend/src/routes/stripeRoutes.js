import express from 'express';
import {
  createCheckoutSession,
  createPortalSession,
  getSubscription,
  handleWebhook
} from '../controllers/stripeController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Webhook route (must be BEFORE express.json() middleware)
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

// Protected routes
router.post('/create-checkout-session', authMiddleware, createCheckoutSession);
router.post('/create-portal-session', authMiddleware, createPortalSession);
router.get('/subscription', authMiddleware, getSubscription);

export default router;
