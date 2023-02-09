import { Request, Response, NextFunction } from 'express';
import knex from '../database/index';
import { CustomersInterface } from '../controllers/CustomerController';

const EmailisAvailableMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const { id } = req.params;

    const customer: CustomersInterface[] = await knex('customers').where({ email });

    if (id && customer.length === 1 && customer[0].id !== Number(id)) {
        return res.status(409).json({ message: 'Esse e-mail já está cadastrado no sistema!', error: true });
    }

    if (!id && customer.length === 1) {
        return res.status(409).json({ message: 'Esse e-mail já está cadastrado no sistema!', error: true });
    }

    next();
};

export default EmailisAvailableMiddleware;