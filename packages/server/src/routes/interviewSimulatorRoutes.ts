import { Router } from 'express';
import { getInterviewSimulations, createInterviewSimulation } from '../controllers/interviewSimulatorController';

const router = Router();

router.get('/', getInterviewSimulations);
router.post('/', createInterviewSimulation);

export default router;
