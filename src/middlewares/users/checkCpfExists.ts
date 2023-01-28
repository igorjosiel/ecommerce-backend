import { Request, Response, NextFunction } from "express";
import { pool } from "../../database/connection";

async function checkCpfExists(req: Request, res: Response, next: NextFunction) {
  const { cpf } = req.body;

  try {
    const result = await pool.query('SELECT * FROM customers WHERE cpf = ?', [cpf]);

    if (result[0].COUNT > 0) {
      return res.status(409).send({ message: 'Esse CPF já está registrado no sistema!', error: true });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: 'Houve um erro interno. Por favor tente mais tarde!' });
  }
}

export default checkCpfExists;