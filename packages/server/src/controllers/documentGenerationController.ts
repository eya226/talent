import { Request, Response } from 'express';
import { generateCoverLetter } from '../services/documentGenerationService';
import User from '../models/User';

export const generateDocuments = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ uid: (req as any).user.uid });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { jobTitle, company } = req.body;
        const cover_letter = await generateCoverLetter(jobTitle, company, user.profile);

        res.json({
            resume_url: 'https://example.com/resume.pdf', // Placeholder
            cover_letter,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error generating documents', error: (error as Error).message });
    }
};
