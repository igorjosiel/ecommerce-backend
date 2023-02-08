import express from 'express';

const router = express.Router();

import CustomerController from './controllers/CustomerController';
import EmailIsValidMiddleware from './middlewares/EmailIsValidMiddleware';

router.get('/customers', CustomerController.get);
router.post('/customers', EmailIsValidMiddleware, CustomerController.create);

export default router;