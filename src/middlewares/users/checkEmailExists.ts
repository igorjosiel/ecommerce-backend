import { Response, Request, NextFunction } from "express";
import { pool } from "../../database/connection";

async function checkEmailExists(req: Request, res: Response, next: NextFunction) {
  const { email } = req.body;

  try {
        const result = await pool.query('SELECT * FROM customers WHERE email = ?', [email]);
        
        if(result[0].length > 0){
            return res.status(409).json({ message: "Esse e-mail já está registrado no sistema!" });
        }

        next();
    } catch (error) {
        return res.status(500).json({ message: 'Houve um erro interno. Por favor tente mais tarde!' });
    }
}

export default checkEmailExists;