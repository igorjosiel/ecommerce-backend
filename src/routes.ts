import express from 'express';

const router = express.Router();

import CustomerController from './controllers/CustomerController';
import {
    EmailIsValidMiddleware,
    CPFisValidMiddleware,
    CPFisAvailableMiddleware,
    EmailisAvailableMiddleware,
    RequiredDataMiddleware,
} from './middlewares';

router.get('/customers', CustomerController.get);
router.post('/customers',
    EmailIsValidMiddleware,
    EmailisAvailableMiddleware,
    CPFisValidMiddleware,
    CPFisAvailableMiddleware,
    RequiredDataMiddleware,
    CustomerController.create
);
router.put('/customers/:id',
    EmailIsValidMiddleware,
    EmailisAvailableMiddleware,
    RequiredDataMiddleware,
    CustomerController.update
);
router.delete('/customers/:id', CustomerController.deleteC);

export default router;