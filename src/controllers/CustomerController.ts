import knex from '../database';
import { Request, Response, NextFunction } from 'express';

interface CustomersInterface {
    id: number,
    password: string,
    name: string,
    datebirth: Date,
    gender: string,
    country: string,
    phonenumber: string,
    created_at: string,
    updated_at: string,
}

async function get(req: Request, res: Response) {
    const customers: CustomersInterface[] = await knex('customers');

    return res.json({ customers, message: 'Usuários listados com sucesso!', error: false });
}

async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password, name, datebirth, gender, country, phonenumber } = req.body;

        await knex('customers').insert({
            email,
            password,
            name,
            datebirth,
            gender,
            country,
            phonenumber,
        });

        return res.status(201).send({ message: 'Usuário cadastrado com sucesso!', error: false });
    } catch (error) {
        next(error);
    }
}

export default {
    get,
    create,
}