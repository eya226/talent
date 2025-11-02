import { Request, Response } from 'express';
import Application from '../models/Application';
import User from '../models/User';

export const getApplications = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ uid: (req as any).user.uid });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const applications = await Application.find({ user: user._id }).populate('internship');
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
