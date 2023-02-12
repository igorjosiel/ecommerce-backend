import { Request, Response, NextFunction } from 'express';
import knex from '../database/index';
import { CustomersInterface } from '../interfaces/CustomersInterface';

const CPFisAvailableMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { cpf } = req.body;

    const customer: CustomersInterface[] = await knex('customers').where({ cpf });

    if (customer.length > 0) return res.status(409).json({ message: 'Esse CPF já está cadastrado no sistema!', error: true });

    next();
};

export default CPFisAvailableMiddleware;