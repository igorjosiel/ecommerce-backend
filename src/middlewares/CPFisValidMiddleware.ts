import { Request, Response, NextFunction } from 'express';
import formatCPF from '../utils/formatCPF';

const CPFisValidMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { cpf } = req.body;

    const formattedCPF = formatCPF(cpf);

    const CPFisInvalid = () => res.status(400).json({ message: 'CPF inválido!', error: true });

    let sum = 0;
    let rest;

    if (formattedCPF == "00000000000") return CPFisInvalid();

    for (let i = 1; i <= 9; i++) sum = sum + parseInt(formattedCPF.substring(i - 1, i)) * (11 - i);

    rest = (sum * 10) % 11;

    if ((rest == 10) || (rest == 11)) rest = 0;
    if (rest != parseInt(formattedCPF.substring(9, 10))) return CPFisInvalid();

    sum = 0;

    for (let i = 1; i <= 10; i++) sum = sum + parseInt(formattedCPF.substring(i - 1, i)) * (12 - i);

    rest = (sum * 10) % 11;

    if ((rest == 10) || (rest == 11)) rest = 0;
    if (rest != parseInt(formattedCPF.substring(10, 11))) return CPFisInvalid();

    return next();
}

export default CPFisValidMiddleware;