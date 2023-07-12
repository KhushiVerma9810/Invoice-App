const express = require("express");
const router = new express.Router();
const User = require('../Models/user');
const Client = require("../Models/Client");
const Product = require("../Models/product")
const  { body, validationResult } = require("express-validator");
const invoiceInf = require("../Models/invoiceInf");
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'khushikainvoiceapp';
const fetchuser = require("../Middleware/fetchuser");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const Company = require('../Models/Company')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Frontend/public/images')
  },
  filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname); // Set the filename for the uploaded file
  },
})
const upload = multer({ storage: storage})
//    fileFilter: (req, file, cb) => {
//   if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//       cb(null, true);
//   } else {
//       cb(null, false);
//       return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//   }
// } })

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
  //hash password using bcrypt
const salt = await bcrypt.genSalt(10);
const  secPass = await bcrypt.hash(req.body.password , salt);
   //create a new user
   user = await User.create({
     name: req.body.name,
     email: req.body.email,
      password: secPass
});
//authentication creation
const data={
  user:{
    id:user.id
  }
}
const authToken= jwt.sign(data , JWT_SECRET);

success = true;
console.log("auth-token");
res.send({success ,authToken})
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
  const passwordCompare = await bcrypt.compare(password , user.password);
  if(!passwordCompare){
    success = false;
    return res.status(400).json({success , error:"Please try to login with correct credentials"});
  }

  const data={
    user:{
      id: user.id
    }
  }
  const authToken= jwt.sign(data , JWT_SECRET);
   success = true;
  res.json({success , authToken})
console.log(user);
}
  catch(error){
    console.log(error.message);
  res.status(500).send("internal server error");
  }

})


//ROUTE 3 : Add Client
router.post("/createclient",fetchuser,upload.single('image'), [
  body('client_name', 'Enter a valid name').isLength({ min: 3 }),
  body('email' , 'Enter a valid email').isEmail(),
  body('address' , 'address must be atleast 10 characters').isLength({ min: 5 }),
  body('phone_no' , 'Phone No must be 10 digits').isLength({ min: 5 }),
  body('image' , 'image path'),
],async(req ,res )=>{
  try{
    let success = false;
    //if there are errors return bad request and the errors
    console.log(req.file);
    const imagepath = req.file.filename;
    console.log(req.file.filename);
    const {client_name,email,phone_no,address } = req.body;
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success ,errors: errors.array() });
      }
      // check whether the user with email exist
    let client1 = await Client.findOne({email:req.body.email});
 
    if(client1){
     return res.status(400).json({error:"Sorry a user with this email already exists"})
    }
   
    //create a new user
   const client = new Client({
      client_name,
      email,
      address,
      phone_no,
      user:req.user.id,
      image:imagepath,
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
router.get("/getclient",fetchuser,async(req , res)=>{
  try {

    const clients = await Client.find({user:req.user.id });
    res.json(clients)
}
// client:req.client._id
catch (error){
    console.log(error.message);
    res.status(500).send("Internal server error");
}
})

//ROUTE 5 :Invoice creation
router.post("/addinvoice" ,fetchuser, [
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
router.post('/addproduct',fetchuser,upload.single('image'),[
  body('name', 'Enter a product name').isLength({ min: 3 }),
  body('price' , 'Enter a price'),
  body('image' , 'image path'),
],async(req , res)=>{
  try{
  let success = false;
  console.log(req.file);
    const imagename = req.file.filename;
    console.log(req.file.filename);
    const {name,price} = req.body;


  const error = validationResult(req);
  
  if (!error.isEmpty()) {
    return res.status(400).json({ success ,errors: error.array() });
  }
    //check if product already exists
  let product1 = await Product.findOne({name:req.body.name});
  if(product1){
    return res.status(400).send("that product already exists");
  }
  else{
   //create a new product
  const product= new Product({
     name,
     price,
     user:req.user.id,
     image:imagename,
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
router.get('/getproduct' , fetchuser,async(req , res)=>{
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
router.patch('/updateclient/:id', fetchuser,async (req, res) => {
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

      if (client.user.toString() !== req.user.id) {
          return res.status(401).send("Not Allowed");
      }
    client = await Client.findByIdAndUpdate(req.params.id, { $set: newClient }, { new: true });
    res.json(client);
}
  catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
  })

  //ROUTE 9: Update Product details
  router.patch("/updateproduct/:id" ,fetchuser, async(req , res)=>{
  
    const {name , price} = req.body;
    // Create a newProduct object
    try{
    const newProduct = {};
   newProduct.name = name;
    newProduct.price = price ;
      // Find the product to be updated and update it
      let product = await Product.findById(req.params.id);
      if (!product) { 
        return res.status(404).send("Not Found") 
      }
      if (product.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
    }

     product = await Product.findByIdAndUpdate(req.params.id, { $set: newProduct }, { new: true })
      res.json({ product });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
  })
 //ROUTE 10: Delete client
 router.delete('/deleteclient/:id', fetchuser,async (req, res) => {
  try{
  //find the client to be delete and delete it
  let client = await Client.findById(req.params.id);
  if(!client){
    res.status(404).send("Not Found")}
   //Allow detection only if own user owns this client
  if(client.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed");
  }
  
 client = await Client.findByIdAndDelete(req.params.id)
  res.json({"Success" : "client has been deleted"});
}
catch(error){
  console.log(error.message);
      res.status(500).send("Internal server error");
  }
})

 //ROUTE 10: Delete product
 router.delete('/deleteproduct/:id', fetchuser,async (req, res) => {
  try{
  //find the note to be delete and delete it
  let product = await Product.findById(req.params.id);
  if(!product){
    res.status(404).send("Not Found")}
   //Allow detection only if own user owns this product
  if(product.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed");
  }
  
product = await Product.findByIdAndDelete(req.params.id)
  res.json({"Success" : "product has been deleted"});
}
catch(error){
  console.log(error.message);
      res.status(500).send("Internal server error");
  }
})

//ROUTE 11: Update User details
router.patch('/updateuser/:id',fetchuser, async(req ,res)=>{
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

      if (client.user.toString() !== req.user.id) {
          return res.status(401).send("Not Allowed");
      }
    user = await User.findByIdAndUpdate(req.params.id, { $set: newUser }, { new: true });
    res.json(user);
}
  catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


//ROUTE 12: ADD COMPANY DETAILS
router.post("/addcompany" , fetchuser ,upload.single('image'), [
  body('comp_name', 'Enter a company name').isLength({ min: 3 }),
  body('email' , 'Enter a valid email').isEmail(),
  body('address' , 'address must be atleast 10 characters').isLength({ min: 5 }),
  body('phone_no' , 'Phone No must be 10 digits').isLength(10),
  body('country' , 'Enter country name').isLength({min:3}),
  body('image' , 'image path'),
  
],async(req , res)=>{
     try {
      let success = false;
      const {comp_name , email, phone_no,address , country } = req.body;
      const imgname = req.file.filename;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success ,errors: errors.array() });
      }
      // check whether the user with email exist
    let company1 = await Client.findOne({email:req.body.email});
 
    if(company1){
     return res.status(400).json({error:"Sorry a user with this email already exists"})
    }
   
      const company = new Company({
           comp_name,
           email,
           phone_no,
           address,
           country,
           user:req.user.id,
           image:imgname
      })
      success = true;
      await company.save();
      console.log(company);
      res.send(company);
     } 
     catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
     }
}
)
//GET COMPANIES
router.get('/getcompany' , fetchuser,async(req,res)=>{
  try {
    const companies = await Company.find({});
    res.json(companies)
  } catch (error) {
    console.log("error",error);
   res.status(500).send("Internal Server Error");
  }
})
 

module.exports = router;