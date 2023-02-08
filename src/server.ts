import express, { NextFunction, Request, Response } from 'express';
import router from './routes';

const app = express();

app.use(express.json());
app.use(router);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500);
    res.json({ error: error.message });
});

app.listen(3333, () => console.log('Server is running!'));