const express = require("express");
const mongoose = require("mongoose");
const connectToMongo = require("./DB/conn");
const userRouter = require("../Backend/router/auth");
const hbs = require("hbs");
const path= require("path");

connectToMongo();
const app = express();
const port = 5000;
const templatePath = path.join(__dirname,"/templates/views");
const partialPath = path.join(__dirname,"/templates/partials");
app.use(express.json());
app.use(userRouter);
app.set("view engine" , "hbs");
app.set("views",templatePath);
hbs.registerPartials(partialPath);

app.get("/",(req,res)=>{
    res.render('index2')
})

app.listen(port , ()=>{
    console.log(`listening at http://localhost:${port}`)
})