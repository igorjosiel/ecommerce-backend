import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import knex from '../database/index';
import { AdministratorsInterface } from '../interfaces/AdministratorsInterface';

async function get(req: Request, res: Response) {
    const administrators: AdministratorsInterface[] = await knex('administrators');

    return res.json({ administrators, message: 'Administradores listados com sucesso!', error: false });
}

async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password, name } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        await knex('administrators').insert({
            email,
            password: hashedPassword,
            name,
        });

        return res.status(201).send({ message: 'Administrador cadastrado com sucesso!', error: false });
    } catch (error) {
        next(error);
    }
}

async function deleteC(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;

        await knex('administrators').where({ id }).del();

        return res.status(200).send({ message: 'Administrador deletado com sucesso!', error: false });
    } catch (error) {
        next(error);
    }
}

export default {
    get,
    create,
    deleteC,
}