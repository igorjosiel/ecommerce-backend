import { Request, Response, NextFunction } from 'express';

const CPFisValidMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { cpf } = req.body;

    const CPFisInvalid = () => res.status(400).json({ message: 'CPF inválido!', error: true });

    let sum = 0;
    let rest;

    if (cpf == "00000000000") CPFisInvalid();

    for (let i = 1; i <= 9; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);

    rest = (sum * 10) % 11;

    if ((rest == 10) || (rest == 11)) rest = 0;
    if (rest != parseInt(cpf.substring(9, 10))) CPFisInvalid();

    sum = 0;

    for (let i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);

    rest = (sum * 10) % 11;

    if ((rest == 10) || (rest == 11)) rest = 0;
    if (rest != parseInt(cpf.substring(10, 11))) CPFisInvalid();

    next();
}

export default CPFisValidMiddleware;