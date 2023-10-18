import Config from '@/config';
import { Request, Response, NextFunction } from 'express';

interface MiddlewareFunc {
    (req: Request, res: Response, next: NextFunction): void;
}

interface AppMiddlewareFunc {
    (app: Config): MiddlewareFunc;
}

export { MiddlewareFunc, AppMiddlewareFunc};
