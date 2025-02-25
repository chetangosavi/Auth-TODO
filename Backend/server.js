import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
connectDB()

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())


// routes
import indexRoutes from './routes/index.routes.js'
app.use('/api',indexRoutes)

let PORT = process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})