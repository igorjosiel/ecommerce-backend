import { Request, Response, NextFunction } from 'express';

const RequiredDataMiddleware = (requiredData: any) => {
    return function (req: Request, res: Response, next: NextFunction) {
        const data = req.body;

        const requiredDataWithError = () => res.status(400).json({ message: 'Dados obrigatórios estão faltando!', error: true });

        // Treatment to validate if all the required data are coming in the request object
        requiredData.forEach((required: string) => {
            const requiredDataSuccessful = Object.keys(req.body).some(data => data === required);

            if (!requiredDataSuccessful) return requiredDataWithError();
        });

        // Treatment to validate if all the required data are coming in the request object with some value
        for (let key in data) {
            if (!data[key]) return requiredDataWithError();
        }

        return next();
    };
}

export default RequiredDataMiddleware;