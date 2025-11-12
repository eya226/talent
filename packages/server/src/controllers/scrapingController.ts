import { Request, Response } from 'express';
import { scrapeIAgora } from '../services/scrapingService';

export const scrapeInternships = async (req: Request, res: Response) => {
    try {
        console.log('Scraping internships from iAgora...');
        const internships = await scrapeIAgora();
        res.json(internships);
    } catch (error) {
        res.status(500).json({ message: 'Error scraping internships', error: (error as Error).message });
    }
};
