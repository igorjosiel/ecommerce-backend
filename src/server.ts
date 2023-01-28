import express from 'express';
import { hash } from 'bcrypt';
import { Router, Request, Response, NextFunction } from 'express';
import { pool } from './database/connection';
import { checkEmailExists } from './middlewares/users';

const cors = require('cors');

const { body, validationResult } = require('express-validator');

const app = express();

const route = Router();

app.use(express.json());
app.use(cors());

route.get('/', (req: Request, res: Response) => {
  res.json({ message: 'hello world with Typescript' });
});

interface createUser {
  email: string,
  password: string,
  cpf: string;
  name: string,
  dateBirth: string,
  gender: string,
  phoneNumber: string,
}

async function verifyCPFMiddleware(req: Request, res: Response, next: NextFunction) {
  const { cpf } = req.body;

  const conn = await pool.getConnection();

  try {
    const [rows] = await conn.execute(
      'SELECT COUNT(cpf) as COUNT FROM customers WHERE cpf = ?', [cpf]
    );

    if (rows[0].COUNT > 0) {
      return res.status(409).send({ message: 'Esse CPF já está registrado no sistema!', error: true });
    }

    next();
  } finally {
    // release the connection
    conn.release();
  }
}

async function insertUser({email, cpf, password, name, dateBirth, gender, phoneNumber}: createUser) {
    // acquire connection from pool
  const conn = await pool.getConnection();

  const passwordHash = await hash(password, 8);

  if (!email || !cpf || !password || !name || !dateBirth || !gender || !phoneNumber) {
    console.log('Error');
  }

  try {
    const [result] = await conn.execute(
      'INSERT INTO customers (email, cpf, password, name, dateBirth, gender, phoneNumber) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [email, cpf, passwordHash, name, dateBirth, gender, phoneNumber]
    );
    
  } finally {
    // release the connection
    // conn.release();
  }
}

route.post('/users', checkEmailExists, verifyCPFMiddleware, async (req: Request, res: Response) => {
  await insertUser(req.body);

  return res.status(201).send({ message: 'Usuário cadastrado com sucesso!' });
});

app.use(route);

app.listen(3333, () => 'server running on port 3333');