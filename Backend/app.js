const express = require("express");
const mongoose = require("mongoose");
const connectToMongo = require("./DB/conn");
const userRouter = require("../Backend/router/auth")

connectToMongo();
const app = express();
const port = 5000;

app.use(express.json());
app.use(userRouter);

app.listen(port , ()=>{
    console.log(`listening at http://localhost:${port}`)
})