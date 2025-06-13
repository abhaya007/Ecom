import { Router } from "express";
import User from "../models/user.js";
const userRouter = Router();

userRouter.post('/register', (req, res) => {
  User.create(req.body)
  res.send('User registered successfully');
})

userRouter.get('/register', async(req, res) => {
  const users = await User.find()
  res.send(users);
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
