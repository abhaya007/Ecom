import express from 'express'
import connect from './db/connect.js'
import cors from 'cors'
import userRouter from './routes/user.js'
import dotenv from 'dotenv'
import productRouter from './routes/product.js'
import categoryRouter from './routes/category.js'
import { createServer } from 'http'
import { Server } from 'socket.io'
dotenv.config()

const port = process.env.PORT
const app = express()

const httpServer = createServer(app)
const io = new Server(httpServer, {cors: {origin: "*"}}) 


io.on('connection', (socket) => {
  console.log(socket.id)
})

app.use('/images',express.static('uploads')) 

connect()
app.use(cors())
app.use(express.json()) 
app.use(userRouter)
app.use(productRouter)
app.use(categoryRouter)



httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})