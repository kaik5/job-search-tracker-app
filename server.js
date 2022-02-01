import express from "express";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleWare from "./middleware/not-found.js";
import authenticateUser from "./middleware/auth.js"
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'
const __dirname = dirname(fileURLToPath(import.meta.url))

import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'

import 'express-async-errors' 
//import cors from 'cors'
const app = express();
import dotenv from 'dotenv'
// user authentication
import connectDB from "./db/connect.js";
import morgan from 'morgan'

// only when ready to deploy
app.use(express.static(path.resolve(__dirname, './client/build')))
app.use(express.json())
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())

//routers
import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'

// only when ready to deploy
app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
  })

dotenv.config()
if(process.env.NODE_ENV !== 'production')
{
    app.use(morgan('dev'))
}
//app.use(express.json())

//app.use(cors())
// middleware
app.get("/", (req, res)=>{
    res.json({msg: "Welcome"});
})

app.get("/api/v1", (req, res)=>{
    res.json({msg: "API"});
})


app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)

app.use(notFoundMiddleWare)
app.use(errorHandlerMiddleware)
const port = process.env.PORT || 5000


const start = async() =>{
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        })
        
    } catch (error) {
        console.log("ERROR");
    }
}

start()