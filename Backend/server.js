import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

let PORT = process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})