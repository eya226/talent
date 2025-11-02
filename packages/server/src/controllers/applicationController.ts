import { Request, Response } from 'express';
import Application from '../models/Application';
import User from '../models/User';

export const submitApplication = async (req: Request, res: Response) => {
    try {
        const { internshipId } = req.body;
        const user = await User.findOne({ uid: (req as any).user.uid });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // This is a placeholder for the automated application submission logic.
        console.log(`Submitting application for user ${user._id} to internship ${internshipId}...`);

        const newApplication = new Application({
            user: user._id,
            internship: internshipId,
        });
        await newApplication.save();

        res.status(201).json(newApplication);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
