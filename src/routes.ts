import express from 'express';

const routes = express.Router();

import CustomerController from './controllers/CustomerController';

routes.get('/customers', CustomerController.read);

export default routes;