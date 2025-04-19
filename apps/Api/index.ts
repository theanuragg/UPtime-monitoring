import express from "express";
import { websiteRouter } from "./Routes/website";
import cors from "cors";
import { authMiddleware } from "./middlewares/Authmiddlewares";
import { rateLimiter } from "./middlewares/Ratelimiting";
import SeoRouter from "./Routes/Seo";

const app = express();
const PORT = 8000;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json({ limit: "1mb" }));
// app.use(rateLimiter);



app.use("/api", authMiddleware, websiteRouter, SeoRouter);

app.post("/", (req, res) => {
  res.json("Welcome to the API!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
