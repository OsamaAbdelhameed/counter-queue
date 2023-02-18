import Joi, { ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import Logging from '../library/Logging';
import { ICustomer } from '../models/Customer';
import { ICounter } from '../models/Counter';

export const ValidateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (err) {
            Logging.err(err);
            return res.status(422).json({ err });
        }
    };
};

export const Schemas = {
    customer: {
        create: Joi.object<ICustomer>({
            branchNo: Joi.number().required(),
            lastIssued: Joi.number().required(),
            inProgress: Joi.array<Number>().required(),
            queue: Joi.array<Number>().required()
        }),
        update: Joi.object<ICustomer>({
            lastIssued: Joi.number(),
            inProgress: Joi.array<Number>(),
            queue: Joi.array<Number>()
        })
    },
    counter: {
        create: Joi.object<ICounter>({
            num: Joi.number().required(),
            name: Joi.string().required(),
            status: Joi.boolean().required(),
            current: Joi.number().required(),
            history: Joi.array<Number>().required()
        }),
        update: Joi.object<ICounter>({
            name: Joi.string(),
            status: Joi.boolean(),
            current: Joi.number(),
            history: Joi.array<Number>()
        })
    }
};
