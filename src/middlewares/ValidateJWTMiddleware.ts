import { Request, Response, NextFunction } from 'express';
import JWTController from '../controllers/JWTController';

const ValidateJWTMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: 'Dados no cabeçalho da requisição estão faltando!', error: true });;
    }

    const [type, token] = authorization.split(' ');

    if (type !== 'Bearer') {
        return res.status(401).json({ message: 'Não autenticado!', error: true });
    }

    const jwtData = JWTController.validate(token);

    if (jwtData === 'JWT_SECRET_NOT_FOUND') {
        return res.status(500).json({ message: 'Erro ao verificar o token!', error: true });
    }

    if (jwtData === 'INVALID_TOKEN') {
        return res.status(401).json({ message: 'Não autenticado!', error: true });
    }

    req.headers.idAdministrator = jwtData.uid.toString();

    return next();
};

export default ValidateJWTMiddleware;