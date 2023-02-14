import express from 'express';

const router = express.Router();

import { AdministratorController, CustomerController } from './controllers';
import {
    EmailIsValidMiddleware,
    CPFisValidMiddleware,
    CPFisAvailableMiddleware,
    EmailisAvailableMiddleware,
    RequiredDataMiddleware,
} from './middlewares';

// Routes for customers

router.get('/customers', CustomerController.get);
router.post('/customers',
    EmailIsValidMiddleware,
    EmailisAvailableMiddleware,
    CPFisValidMiddleware,
    CPFisAvailableMiddleware,
    RequiredDataMiddleware([
        'email',
        'password',
        'name',
        'cpf',
        'datebirth',
        'gender',
        'country',
        'phonenumber',
    ]),
    CustomerController.create
);
router.put('/customers/:id',
    EmailIsValidMiddleware,
    EmailisAvailableMiddleware,
    RequiredDataMiddleware([
        'email',
        'password',
        'name',
        'datebirth',
        'gender',
        'country',
        'phonenumber',
    ]),
    CustomerController.update
);
router.delete('/customers/:id', CustomerController.deleteC);

// Routes for administrators

router.get('/administrators', AdministratorController.get);
router.post('/administrators',
    EmailIsValidMiddleware,
    EmailisAvailableMiddleware,
    RequiredDataMiddleware(['email', 'password', 'name']),
    AdministratorController.signUp
);
router.post('/administrators/login',
    RequiredDataMiddleware(['name', 'password']),
    AdministratorController.signIn
);
router.delete('/administrators/:id', AdministratorController.deleteC);

export default router;