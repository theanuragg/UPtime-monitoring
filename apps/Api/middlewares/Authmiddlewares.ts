import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";

interface DecodedToken {
  sub: string;
}

function handleError(res: Response, message: string) {
  res.status(401).json({
    message,
    success: false,
  });
}


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: {
    message: "Too many requests, don't so it stop it",
    success: false,
  },
});

export const authMiddleware = [
  limiter, 
  (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      handleError(res, "No token provided in the header");
      return;
    }

    let decoded: DecodedToken;
    try {
      decoded = jwt.verify(token, process.env.JWT_PUBLIC_KEY!, {
        algorithms: ["RS256"],
      }) as DecodedToken;
    } catch {
      handleError(res, "Invalid token or token expired");
      return;
    }

    const userId = decoded.sub;
    if (!userId) {
      handleError(res, "Invalid token or token expired");
      return;
    }
    
    req.userId = userId;
    next();
  },
];