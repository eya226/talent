import { Router } from 'express';
import { getReadinessPassport } from '../controllers/readinessPassportController';

const router = Router();

router.get('/:userId', getReadinessPassport);

export default router;
