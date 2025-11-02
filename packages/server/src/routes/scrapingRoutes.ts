import { Router } from 'express';
import { scrapeInternships } from '../controllers/scrapingController';

const router = Router();

router.post('/', scrapeInternships);

export default router;
