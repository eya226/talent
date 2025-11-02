import { Request, Response } from 'express';
import InterviewSimulation from '../models/InterviewSimulation';
import User from '../models/User';

export const getInterviewSimulations = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ uid: req.params.userId });
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
        const user = await User.findOne({ uid: req.body.user });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const newSimulation = new InterviewSimulation({
            ...req.body,
            user: user._id,
        });
        const savedSimulation = await newSimulation.save();
        res.status(201).json(savedSimulation);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};
