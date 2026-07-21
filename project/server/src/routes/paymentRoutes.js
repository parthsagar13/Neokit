import { Router } from 'express';
import { createOrder, createNeoKitOrder, verifyPayment } from '../controllers/paymentController.js';
import { userAuthMiddleware } from '../middlewares/auth.js';
import { paymentRateLimiter } from '../middlewares/rateLimiter.js';

const router = Router();

router.post('/create-order', paymentRateLimiter, userAuthMiddleware, createOrder);
router.post('/create-neokit-order', paymentRateLimiter, userAuthMiddleware, createNeoKitOrder);
router.post('/verify', paymentRateLimiter, userAuthMiddleware, verifyPayment);

export default router;
