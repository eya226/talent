import { Request, Response } from 'express';
import InterviewSimulation from '../models/InterviewSimulation';
import User from '../models/User';

export const getInterviewSimulations = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ uid: (req as any).user.uid });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const simulations = await InterviewSimulation.find({ user: user._id });
        res.json(simulations);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const createInterviewSimulation = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ uid: (req as any).user.uid });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Placeholder logic mimicking a Hugging Face model response
        const { scenario_type } = req.body;
        let feedback = '';
        let readiness_score = 0;

        switch (scenario_type) {
            case 'live_coding':
                feedback = 'Your solution was functional but could be optimized for edge cases. Consider time complexity.';
                readiness_score = 75;
                break;
            case 'hr_behavioral':
                feedback = 'You provided a strong example using the STAR method. Your communication was clear and concise.';
                readiness_score = 90;
                break;
            default:
                feedback = 'This is a placeholder feedback for your simulation.';
                readiness_score = 60;
        }

        const newSimulation = new InterviewSimulation({
            user: user._id,
            scenario_type,
            scenario_details: 'Placeholder scenario details.',
            feedback,
            readiness_score,
        });

        const savedSimulation = await newSimulation.save();
        res.status(201).json(savedSimulation);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};
