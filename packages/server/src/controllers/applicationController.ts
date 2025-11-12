import { Request, Response } from 'express';
import Application from '../models/Application';
import User from '../models/User';
import Internship from '../models/Internship';
import { autoSubmitApplication } from '../services/applicationService';

export const submitApplication = async (req: Request, res: Response) => {
    try {
        const { internshipId } = req.body;
        const user = await User.findOne({ uid: (req as any).user.uid });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const internship = await Internship.findById(internshipId);
        if (!internship) {
            return res.status(404).json({ message: 'Internship not found' });
        }

        const submissionSuccessful = await autoSubmitApplication(internship.url, user.profile);

        if (submissionSuccessful) {
            const newApplication = new Application({
                user: user._id,
                internship: internshipId,
                status: 'submitted',
            });
            await newApplication.save();
            res.status(201).json(newApplication);
        } else {
            res.status(500).json({ message: 'Failed to submit application' });
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
