import Config from '@/config';
import { RequestWithUser } from '@/types';
import { Response, NextFunction } from 'express';

interface MiddlewareFunc {
    (req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
}

interface AppMiddlewareFunc {
    (app: Config): MiddlewareFunc;
}

export { MiddlewareFunc, AppMiddlewareFunc};
