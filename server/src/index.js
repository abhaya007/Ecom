import express from 'express'
import connect from './db/connect.js'
import userRoute from './routes/user.js'
import userRouter from './routes/user.js'
const app = express()
const port = 8000
connect()

app.use(express.json()) 
app.use(userRouter)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})