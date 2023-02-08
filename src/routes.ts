import express from 'express';

const router = express.Router();

import CustomerController from './controllers/CustomerController';
import { EmailIsValidMiddleware, CPFisValidMiddleware } from './middlewares';

router.get('/customers', CustomerController.get);
router.post('/customers', EmailIsValidMiddleware, CPFisValidMiddleware, CustomerController.create);

export default router;