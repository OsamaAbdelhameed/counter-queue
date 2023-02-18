import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Counter from '../models/Counter';

const createCounter = (req: Request, res: Response, next: NextFunction) => {
    const { num, name, status, current, history } = req.body;

    const counter = new Counter({
        num, name, status, current, history
    });

    return counter
        .save()
        .then((Counter) => res.status(200).json({ Counter }))
        .catch((err) => res.status(500).json({ err }));
};

const getCounter = (req: Request, res: Response, next: NextFunction) => {
    const num = req.params.num;

    return Counter.find({num}).limit(1)
        .then((Counter) => (Counter ? res.status(200).json({ Counter }) : res.status(404).json({ message: 'Not found' })))
        .catch((err) => res.status(500).json({ err }));
};

const getAllCounter = (req: Request, res: Response, next: NextFunction) => {
    return Counter.find()
        .then((Counters) => res.status(200).json({ Counters }))
        .catch((err) => res.status(500).json({ err }));
};

const updateCounter = (req: Request, res: Response, next: NextFunction) => {
    const num = req.params.num;

    return Counter.find({num}).then((counter) =>
        counter
            ? counter[0]
                  .set(req.body)
                  .save()
                  .then((Counter) => res.status(200).json({ Counter }))
                  .catch((err) => res.status(500).json({ err }))
            : res.status(404).json({ message: 'Not found' })
    );
};

export default { createCounter, getCounter, getAllCounter, updateCounter };
