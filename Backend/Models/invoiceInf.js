const mongoose = require("mongoose");
const {Schema} = mongoose;
const InvoiceSchema = new Schema({
  invoiceNo:{
   type:String,
   required:true
    },
    company:{
            comp_name:String,
            address:String,
            email:String,
            phone_no:Number,
            country:String,
    },
    invoiceDate:{
        type:String,
        required:true,
        default: Date.now
    },
    dueDate:{
        type:Date,
        required:true
    },
    client: {
        client_name:String,
        address:String,
        email:String,
        phone_no:Number,
      },
    items:[
        {
            prod_name: {
                type: String,
                required : true,
            },
            quantity: {
                type: Number,
                required : true, // required informs for missing fields
            },
            price:{
                type:Number,
                required:true,
            },
            amount:{
                type:Number,
                required:true
            }
        }
    ],
    subtotal:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        required:true
    },
    tax:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('invoice' , InvoiceSchema );