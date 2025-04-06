import express from "express";
import { websiteRouter } from './Routes/website'
import cors from 'cors'
import { authMiddleware } from "./middlewares/Authmiddlewares";

const app = express();
const PORT = 8000;

app.use(cors({
    origin: '*',
}))

app.use('/api', websiteRouter)
    

app.post('/', (req, res ) => {
    res.json("Welcome to the API!")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


