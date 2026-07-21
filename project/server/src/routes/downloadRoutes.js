import { Router } from 'express';
import { downloadNeoKit, secureDownload } from '../controllers/downloadController.js';
import { userAuthMiddleware } from '../middlewares/auth.js';
import { downloadRateLimiter } from '../middlewares/rateLimiter.js';

const router = Router();

router.get('/neokit', downloadRateLimiter, userAuthMiddleware, downloadNeoKit);
router.get('/:templateId', downloadRateLimiter, userAuthMiddleware, secureDownload);

export default router;
