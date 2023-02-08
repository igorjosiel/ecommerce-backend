import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

const EmailIsValidMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  if (!validator.isEmail(email)) return res.status(400).json({ message: 'E-mail inválido!', error: true });

  next();
};

export default EmailIsValidMiddleware;