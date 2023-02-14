import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import knex from '../database/index';
import { AdministratorsInterface } from '../interfaces/AdministratorsInterface';
import JWTController from './JWTController';

async function get(req: Request, res: Response) {
    const administrators: AdministratorsInterface[] = await knex('administrators');

    return res.json({ administrators, message: 'Administradores listados com sucesso!', error: false });
}

async function signUp(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password, name } = req.body;

        const hashedPassword = await bcrypt.hash(password, 8);

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

async function signIn(req: Request, res: Response, next: NextFunction) {
    try {
        const { password, name } = req.body;

        const administrator = await knex('administrators').where({ name }).first();

        var passwordMatch;

        if (administrator) {
            passwordMatch = await bcrypt.compare(password, administrator.password);
        }

        if (!administrator || !passwordMatch) {
            return res.status(404).send({ message: 'Administrador não encontrado!', error: true });
        }

        const accessToken = JWTController.generate({ uid: administrator.id });

        if (accessToken === 'JWT_SECRET_NOT_FOUND') {
            return res.status(500).send({ message: 'Erro ao gerar o token de acesso!', error: true });
        }

        return res.status(200).send({ message: 'Administrador encontrado com sucesso!', accessToken, error: false });
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
    signUp,
    signIn,
    deleteC,
}