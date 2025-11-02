import { Request, Response } from 'express';
import Resource from '../models/Resource';

export const getResources = async (req: Request, res: Response) => {
    try {
        const resources = await Resource.find(req.query);
        res.json(resources);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
