import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Customer from '../models/Customer';

const createCustomer = (req: Request, res: Response, next: NextFunction) => {
    const { branchNo, lastIssued, inProgress, queue } = req.body;

    const customer = new Customer({
        branchNo, lastIssued, inProgress, queue
    });

    return customer
        .save()
        .then((customer) => res.status(200).json({ customer }))
        .catch((err) => res.status(500).json({ err }));
};

const getCustomer = (req: Request, res: Response, next: NextFunction) => {
    const branchNo = req.params.branchNo;

    return Customer.find({branchNo})
        .then((customer) => (customer ? res.status(200).json({ customer }) : res.status(404).json({ message: 'Not found' })))
        .catch((err) => res.status(500).json({ err }));
};

const getAllCustomer = (req: Request, res: Response, next: NextFunction) => {
    return Customer.find()
        .then((customers) => res.status(200).json({ customers }))
        .catch((err) => res.status(500).json({ err }));
};

const updateCustomer = (req: Request, res: Response, next: NextFunction) => {
    const branchNo = req.params.branchNo;

    return Customer.find({branchNo}).then((customer) =>
        customer
            ? customer[0]
                  .set(req.body)
                  .save()
                  .then((customer) => res.status(200).json({ customer }))
                  .catch((err) => res.status(500).json({ err }))
            : res.status(404).json({ message: 'Not found' })
    );
};

export default { createCustomer, getCustomer, getAllCustomer, updateCustomer };
