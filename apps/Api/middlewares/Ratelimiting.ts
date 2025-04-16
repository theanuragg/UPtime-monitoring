import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, 
  message: {
    success: false,
    message: "https://www.theaanurag.xyz/",
  },
  standardHeaders: true, 
  legacyHeaders: false,  
});
