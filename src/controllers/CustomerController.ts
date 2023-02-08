import knex from '../database';
import { Request, Response } from 'express';

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

async function read(req: Request, res: Response) {
    knex('customers').then((results: CustomersInterface[]) => {
        return res.json(results);
    });
}

export default {
    read,
}