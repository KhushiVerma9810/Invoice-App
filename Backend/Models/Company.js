const mongoose = require("mongoose")
const {Schema} = require("mongoose");
const companySchema =new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    comp_name :{
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
    country:{
        type:String,
        required:true
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
module.exports = mongoose.model('company' , companySchema);