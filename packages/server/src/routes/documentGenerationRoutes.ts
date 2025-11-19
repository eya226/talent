import { Router } from 'express';
import { generateDocuments } from '../controllers/documentGenerationController';

const router = Router();

router.post('/', generateDocuments);

export default router;
