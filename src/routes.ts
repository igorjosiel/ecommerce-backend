import express from 'express';

const router = express.Router();

import { AdministratorController, CustomerController } from './controllers';
import {
    EmailIsValidMiddleware,
    CPFisValidMiddleware,
    CPFisAvailableMiddleware,
    EmailisAvailableMiddleware,
    RequiredDataMiddleware,
    ValidateJWTMiddleware,
} from './middlewares';

// Routes for customers

router.get('/customers', ValidateJWTMiddleware, CustomerController.get);
router.post('/customers',
    ValidateJWTMiddleware,
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
    EmailIsValidMiddleware,
    EmailisAvailableMiddleware,
    CPFisValidMiddleware,
    CPFisAvailableMiddleware,
    CustomerController.create
);
router.put('/customers/:id',
    ValidateJWTMiddleware,
    RequiredDataMiddleware([
        'email',
        'password',
        'name',
        'datebirth',
        'gender',
        'country',
        'phonenumber',
    ]),
    EmailIsValidMiddleware,
    EmailisAvailableMiddleware,
    CustomerController.update
);
router.delete('/customers/:id', ValidateJWTMiddleware, CustomerController.deleteC);

// Routes for administrators

router.get('/administrators', AdministratorController.get);
router.post('/administrators',
    RequiredDataMiddleware(['password', 'name', 'email']),
    EmailIsValidMiddleware,
    EmailisAvailableMiddleware,
    AdministratorController.signUp
);
router.post('/administrators/login',
    RequiredDataMiddleware(['name', 'password']),
    AdministratorController.signIn
);
router.delete('/administrators/:id', AdministratorController.deleteC);

export default router;