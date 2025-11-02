import { Request, Response } from 'express';
import InterviewSimulation from '../models/InterviewSimulation';

export const getInterviewSimulations = async (req: Request, res: Response) => {
    try {
        const simulations = await InterviewSimulation.find({ user: req.params.userId });
        res.json(simulations);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const createInterviewSimulation = async (req: Request, res: Response) => {
    try {
        const newSimulation = new InterviewSimulation(req.body);
        const savedSimulation = await newSimulation.save();
        res.status(201).json(savedSimulation);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};
