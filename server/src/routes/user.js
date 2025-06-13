import { Router } from "express";
import User from "../models/user.js";
const userRouter = Router();

userRouter.post('/register', async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if(user)
     return res.send('Email already exists');
  else User.create(req.body)
    return res.send('User registered successfully');
})

userRouter.get('/users', async(req, res) => {
  const data = await User.find()
  res.send(data);
})



export default userRouter;


// const userRoute = Router();
// userRoute.post("/user", (req, res) => {
//   User.create(req.body);
//   res.send("User created successfully");
// });

// userRoute.get("/user", async(req, res) => {
//   const users = await User.find();
//   res.send(users);
// });

// export default userRoute;
