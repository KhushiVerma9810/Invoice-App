const express = require("express");
const router = new express.Router();
const User = require('../Models/user');
const Client = require("../Models/Client")
const Product = require("../Models/product")
const  { body, validationResult } = require("express-validator");
const invoiceInf = require("../Models/invoiceInf");


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
  body('name', 'Enter a valid name').isLength({ min: 3 }),
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

//ROUTE 5 :Invoice creation
router.post("/addinvoice" , [
body('name' , 'Enter a valid name').isLength({ min: 3 }),
body('invoicedate')
  .notEmpty().withMessage('Date is required')
  .isDate().withMessage('Invalid date format')
  .custom((value) => {
    const currentDate = new Date();
    const inputDate = new Date(value);
    if (inputDate === currentDate) {
      throw new Error('please write present date');
    }
    return true;
  }),
  body('duedate')
  .notEmpty().withMessage('Date is required')
  .isDate().withMessage('Invalid date format')
  .custom((value) => {
    const currentDate = new Date();
    const inputDate = new Date(value);
    if (inputDate < currentDate) {
      throw new Error('Date must be in the future');
    }
    return true;
  })
],async (req, res) => {
  try {
    let success = false;
    //if there are errors return bad request and the errors
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success ,errors: errors.array() });
      }
    let product = await Product.findOne({});
    let client = await Client.findOne({});
      let invoice = await invoiceInf.create({
        clientData :client,
        invoiceDate : req.body.invoicedate,
        dueDate : req.body.duedate,
        productDetails:product
       });
       success = true;
       res.send(invoice);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
})


//ROUTE 6 :Add product
router.post('/addproduct' , [
  body('name', 'Enter a product name').isLength({ min: 3 }),
  body('price' , 'Enter a price'),
],async(req , res)=>{
  let success = false;
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ success ,errors: error.array() });
  }
  // check whether the user with email exist
  try{
  let product = await Product.findOne({name:req.body.name});
  if(product){
    return res.status(400).send("that product already exists");
  }
  else{
   //create a new user
   product= await Product.create({
     name: req.body.name,
     price: req.body.price
})
success = true;
console.log(product);
await product.save();
res.send(product);
  }
}catch(error){
  console.log(error.message);
  res.status(500).send("Internal server error");
}
})

//ROUTER 7 : Get Product details

router.get('/getproduct' , async(req , res)=>{
  try {

    const products = await Product.find({});
    res.json(products)
}
catch (error){
    console.log(error.message);
    res.status(500).send("Internal server error");
}
})

//ROUTE 8: Update Client information
router.patch('/updateclient/:id', async (req, res) => {
  const {client_name, email,address , phone_no } = req.body;
  try {
      // Create a newNote object
      const newClient = {};

      if (client_name) {
        newClient.client_name = client_name;
      }
        newClient.email = email;
        newClient.address = address;
        newClient.phone_no = phone_no;

      // Find the note to be updated and update it
      let client = await Client.findById(req.params.id);
      if (!client) {
        return res.status(404).send("Not Found");
      }

      // if (note.user.toString() !== req.user.id) {
      //     return res.status(401).send("Not Allowed");
      // }
    client = await Client.findByIdAndUpdate(req.params.id, { $set: newClient }, { new: true });
    res.json(client);
}
  catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
  })

  //ROUTE 9: Update Product details
  router.patch("/updateproduct/:id" , async(req , res)=>{
  
    const {name , price} = req.body;
    // Create a newProduct object
    try{
    const newProduct = {};
   newProduct.name = name;
    newProduct.price = price ;
      // Find the note to be updated and update it
      let product = await Product.findById(req.params.id);
      if (!product) { 
        return res.status(404).send("Not Found") 
      }
     product = await Product.findByIdAndUpdate(req.params.id, { $set: newProduct }, { new: true })
      res.json({ product });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
  })
 //ROUTE 10: Delete client
 router.delete('/deleteclient/:id',async (req, res) => {
  try{
  //find the note to be delete and delete it
  let client = await Client.findById(req.params.id);
  if(!client){
    res.status(404).send("Not Found")}
  //  //Allow detection only if own user owns this note
  // if(note.user.toString() !== req.user.id){
  //     return res.status(401).send("Not Allowed");
  // }
  
 client = await Client.findByIdAndDelete(req.params.id)
  res.json({"Success" : "client has been deleted"});
}
catch(error){
  console.log(error.message);
      res.status(500).send("Internal server error");
  }
})

 //ROUTE 10: Delete product
 router.delete('/deleteproduct/:id',async (req, res) => {
  try{
  //find the note to be delete and delete it
  let product = await Product.findById(req.params.id);
  if(!product){
    res.status(404).send("Not Found")}
  //  //Allow detection only if own user owns this note
  // if(note.user.toString() !== req.user.id){
  //     return res.status(401).send("Not Allowed");
  // }
  
product = await Product.findByIdAndDelete(req.params.id)
  res.json({"Success" : "product has been deleted"});
}
catch(error){
  console.log(error.message);
      res.status(500).send("Internal server error");
  }
})

//ROUTE 11: Update User details
router.patch('/updateuser/:id', async(req ,res)=>{
  const {name, email,password } = req.body;
  try {
      // Create a newNote object
      const newUser = {};

        newUser.name= name;
        newUser.email= email;
        newUser.password= password;

      // Find the note to be updated and update it
      let user = await User.findById({_id:req.params.id});
      if (!user) {
        return res.status(404).send("Not Found");
      }

      // if (note.user.toString() !== req.user.id) {
      //     return res.status(401).send("Not Allowed");
      // }
    user = await User.findByIdAndUpdate(req.params.id, { $set: newUser }, { new: true });
    res.json(user);
}
  catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

 

module.exports = router;