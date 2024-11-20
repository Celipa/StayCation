import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export function verifyToken(req: AuthenticatedRequest, res: Response, next: NextFunction): void;