import express from "express";
import { websiteRouter } from './Routes/website'
import cors from 'cors'
import { authMiddleware } from "./middlewares/Authmiddlewares";

const app = express();
const PORT = 8000;
cors({
    origin: "*"
})

app.use('*', authMiddleware)
app.use('/api', websiteRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


