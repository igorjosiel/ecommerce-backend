import { Request, Response, NextFunction } from 'express';
import knex from '../database';
import { CustomersInterface } from '../interfaces/CustomersInterface';
import formatCPF from '../utils/formatCPF';

async function get(req: Request, res: Response) {
    const { name, cpf } = req.query;

    const formattedCPF = cpf && formatCPF(String(cpf));

    var customers: CustomersInterface[] = [];
    var statusCode = 200;
    var message = '';
    var error = false;

    if (!name && !cpf) customers = await knex('customers');
    if (name && cpf) customers = await knex('customers').where({ name, cpf: formattedCPF });
    if (name) customers = await knex('customers').where({ name });
    if (cpf) customers = await knex('customers').where({ cpf: formattedCPF });

    if (customers.length === 0) {
        statusCode = 404;
        message = 'Nenhum usuário foi encontrado!';
        error = true;
    }
    else message = 'Usuários listados com sucesso!';

    return res.status(statusCode).json({ customers, message, error });
}

async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password, name, cpf, datebirth, gender, country, phonenumber } = req.body;

        const formattedCPF = cpf && formatCPF(String(cpf));

        await knex('customers').insert({
            email,
            password,
            name,
            cpf: formattedCPF,
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