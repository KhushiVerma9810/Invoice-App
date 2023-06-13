const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const clientSchema = new Schema({
    client_name :{
        type:String,
        required:true
    },
    email:{
      type:String,
      required:true,
      unique:true
    },
    address:{
        type:String,
        required:true,
    },
    phone_no:{
        type:Number,
        required:true
    }
})
module.exports = mongoose.model('client' , clientSchema);