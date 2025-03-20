import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { JWT_PUBLIC_KEY } from "../Config/config";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, JWT_PUBLIC_KEY, (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
        if (err || !decoded || (typeof decoded === 'string' && !decoded.sub)) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        req.userId = typeof decoded === 'string' ? decoded : (decoded as JwtPayload).sub;
        next();
    });
};