import express from 'express'
import connect from './db/connect.js'
import cors from 'cors'
import userRouter from './routes/user.js'
import dotenv from 'dotenv'
import productRouter from './routes/product.js'
dotenv.config()

const app = express()
const port = process.env.PORT

connect()
app.use(cors())
app.use(express.json()) 
app.use(userRouter)
app.use(productRouter)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})