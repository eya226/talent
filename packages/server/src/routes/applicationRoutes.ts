import { Router } from 'express';
import { submitApplication } from '../controllers/applicationController';
import { getApplications } from '../controllers/trackingController';

const router = Router();

router.post('/', submitApplication);
router.get('/', getApplications);

export default router;
