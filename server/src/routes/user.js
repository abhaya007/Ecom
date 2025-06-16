import { Router } from "express";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken"
const salRounds = 10;
import User from "../models/user.js";
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
    return res.send('User registered successfully');
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

   const token = await jwt.sign({ email: email},'5ede54ac6493a09864e2560d46ffcb793190fd76101911c14646a3187853920face35506d35221b7abb4a305dd6496680749842cf1fc1f32fa47467b94564969' 
   )


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
