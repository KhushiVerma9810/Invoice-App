const mongoose = require("mongoose");
const {Schema} = mongoose;
const productSchema = new Schema({
   name:{
    type:String,
    required:true
   },
   price:{
    type:String,
    required:true
   },
});
module.exports = mongoose.model('product' , productSchema);