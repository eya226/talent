import { Router } from 'express';
import { getOnboardingMessage, getPersonalizedRecommendation } from '../controllers/aiMentorController';

const router = Router();

router.get('/onboarding', getOnboardingMessage);
router.get('/recommendation', getPersonalizedRecommendation);

export default router;
