import { Router } from 'express';
import { getInternships } from '../controllers/internshipController';

const router = Router();

router.get('/', getInternships);

export default router;
