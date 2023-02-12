import { Request, Response, NextFunction } from 'express';
import knex from '../database';
import { CustomersInterface } from '../interfaces/CustomersInterface';

async function get(req: Request, res: Response) {
    const customers: CustomersInterface[] = await knex('customers');

    return res.json({ customers, message: 'Usuários listados com sucesso!', error: false });
}

async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password, name, cpf, datebirth, gender, country, phonenumber } = req.body;

        await knex('customers').insert({
            email,
            password,
            name,
            cpf,
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

async function update(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const { email, password, name, datebirth, gender, country, phonenumber } = req.body;

        await knex('customers').update({
            email,
            password,
            name,
            datebirth,
            gender,
            country,
            phonenumber,
        }).where({ id });

        return res.status(200).send({ message: 'Usuário atualizado com sucesso!', error: false });
    } catch (error) {
        next(error);
    }
}

async function deleteC(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;

        await knex('customers').where({ id }).del();

        return res.status(200).send({ message: 'Usuário deletado com sucesso!', error: false });
    } catch (error) {
        next(error);
    }
}

export default {
    get,
    create,
    update,
    deleteC,
}