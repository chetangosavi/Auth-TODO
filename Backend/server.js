import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 8000

app.listen(prompt,()=>{
    console.log(`Server is running on ${PORT}`)
})