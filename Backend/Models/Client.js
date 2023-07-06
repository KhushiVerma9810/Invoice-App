const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const clientSchema = new Schema({
  user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
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
    },
    image: {
        type: String, 
        required: false
      },
})
module.exports = mongoose.model('client' , clientSchema);