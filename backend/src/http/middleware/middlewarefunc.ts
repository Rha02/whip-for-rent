import { Request, Response, NextFunction } from 'express';

interface MiddlewareFunc {
    (req: Request, res: Response, next: NextFunction): void;
}

export default MiddlewareFunc;
