import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_PUBLIC_KEY } from "../Config/config";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const decoded = jwt.verify(token, JWT_PUBLIC_KEY);

  console.log(decoded);

  if (!decoded || !decoded.sub) {
    return res.status(401).json({ error: "unauth" });
  }

  req.userId = decoded.sub as string;
  req.userId = "1"
  next();
};
