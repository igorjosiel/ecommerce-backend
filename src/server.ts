import express, { NextFunction, Request, Response } from 'express';
import router from './routes';
import CustomError from './classes/CustomerError';

const app = express();

app.use(express.json());
app.use(router);

// tratamento de erro para rota não encontrada
app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new CustomError('Caminho não encontrado!', 404);
    error.status = 404;

    next(error);
});

// Catch all
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500);
    res.json({ error: error.message });
});

app.listen(3333, () => console.log('Server is running!'));

export default app;