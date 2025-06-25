import { Router } from "express";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken"
const salRounds = 10;
import User from "../models/user.js";
import sendEmail from "../utils/sendEmail.js";
const userRouter = Router();

userRouter.post('/register', async (req, res) => {
  //step 1: Check if the email already exists
  const user = await User.findOne({ email: req.body.email })
  if(user)
     return res.send('Email already exists');
  else {
    //step 2: If not, hash the password and create a new user
    req.body.password = await bycrypt.hash(req.body.password,salRounds);
    //step 3: Save the user to the database
    User.create(req.body)
    sendEmail(req.body.email);
    return res.send('User registered, check your email');
}})

userRouter.post('/login', async (req, res) => {
  const {email, password} = req.body
  //step 1: Check if the email exists
  const user = await User.findOne({ email: email })

  //no: return 'Email does not exist'
   if(!user) return res.send({message:'Email does not exist'});

  //yes:
   //step 2: Check if the password mathes to the hashed password
   const isMatch = await bycrypt.compare(password, user.password);
   if(!isMatch) return res.send({message:'Invalid password'});

   const token = await jwt.sign({ email: email},process.env.JWT_SECRET)


   return res.send({
      message: 'Login successful',
      user: user,
      isLoggedIn: true,
      token
      
   })
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
