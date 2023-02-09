import { Request, Response, NextFunction } from 'express';

const RequiredDataMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;

    for (let key in data) {
        if (!data[key]) return res.status(400).json({ message: 'Dados obrigatórios estão faltando!', error: true });
    }

    next();
};

export default RequiredDataMiddleware;