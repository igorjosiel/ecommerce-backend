import jwt from 'jsonwebtoken';
import { JWTInterface } from '../interfaces/JWTInterface';

const generate = (data: JWTInterface): string | 'JWT_SECRET_NOT_FOUND' => {
    if (!process.env.JWT_SECRET) return 'JWT_SECRET_NOT_FOUND';

    return jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: '6h'
    });
}

const validate = (token: string): JWTInterface | 'JWT_SECRET_NOT_FOUND' | 'INVALID_TOKEN' => {
    if (!process.env.JWT_SECRET) return 'JWT_SECRET_NOT_FOUND';

    console.log('Chegou', token, process.env.JWT_SECRET);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (typeof decoded === 'string') {
            return 'INVALID_TOKEN';
        }

        return decoded as JWTInterface;
    } catch (error) {
        console.log('Chegou... ', error);
        return 'INVALID_TOKEN';
    }
}

export default {
    generate,
    validate,
}