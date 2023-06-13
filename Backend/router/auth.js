const express = require("express");
const router = new express.Router();
const User = require('../Models/user');
const Client = require("../Models/client")
const  { body, validationResult } = require("express-validator");


// registeration of user
router.post('/user/signup' ,[
    body('name' , 'Enter a valid name').isLength({ min: 3 }),
  body('email' , 'Enter a valid email').isEmail(),
  body('password' , 'Password must be atleast 5 characters').isLength({ min: 5 }),
] ,async(req , res)=>{
  let success = false;
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ success ,errors: error.array() });
  }
  // check whether the user with email exist
  try{
  let user = await User.findOne({email:req.body.email});
  if(user){
    return res.status(400).send("that user already exists");
  }
  else{
   //create a new user
   user = await User.create({
     name: req.body.name,
     email: req.body.email,
      password: req.body.password
})
success = true;
console.log(user);
await user.save();
res.send(user);
  }
}catch(error){
  console.log(error.message);
  res.status(500).send("Internal server error");
}
});

//ROUTE 2: login user
router.post("/user/login" , [
  body('email' , 'Enter a valid email').isEmail(),
  body('password' , 'Password cannot be blank').exists(),
] , async(req , res)=>{
  let success = false;
  //if there are errors , return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
const {email , password} = req.body;
try{
  let user = await User.findOne({email});
  if(!user){
    return res.status(400).json({error:"Please try to login with correct credentials"});
  }
  if(password != user.password){
    success = false;
    return res.status(400).json({success, error:"Please try to login with correct credentials"})
  }
  success = true;
console.log(user);
}
  catch(error){
    console.log(error.message);
  res.status(500).send("internal server error");
  }

})


//ROUTE 3 : Add Client
router.post("/createclient" , [
  body('name' , 'Enter a valid name').isLength({ min: 3 }),
  body('email' , 'Enter a valid email').isEmail(),
  body('address' , 'address must be atleast 10 characters').isLength({ min: 5 }),
  body('phoneNo' , 'Phone No must be 10 digits').isLength({ min: 5 }),
],async(req ,res )=>{
  let success = false;
  //if there are errors return bad request and the errors
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success ,errors: errors.array() });
    }
     // check whether the user with email exist
  try{
    let client = await Client.findOne({email:req.body.email});
 
    if(client){
     return res.status(400).json({error:"Sorry a user with this email already exists"})
    }
   
    //create a new user
    client = await Client.create({
      client_name: req.body.name,
      email: req.body.email,
      address:req.body.address,
      phone_no :req.body.phoneNo
     });
     success = true;
console.log(client);
await client.save();
res.send(client);
    }
    catch(error){
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  })

  //ROUTE 4 : Get clients details
router.get("/getclient/:id",async(req , res)=>{
  try {

    const clients = await Client.find({client:req.client._id});
    res.json(clients)
}
catch (error){
    console.log(error.message);
    res.status(500).send("Internal server error");
}
})

module.exports = router;