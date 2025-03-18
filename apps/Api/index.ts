import express  from "express";
import {websiteRouter} from './Routes/website'
import cors from 'cors'
import { authMiddleware } from "./middlewares/Authmiddlewares";


const app  = express.Router()

cors({
    origin: "*"
})

app.use('*', authMiddleware)
app.use('/api', websiteRouter)



