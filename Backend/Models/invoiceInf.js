const mongoose = require("mongoose");
const {Schema} = mongoose;
const InvoiceSchema = new Schema({
    client:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'client'
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
    items:{
        quantity: Number,
        price : String,
        amount : String
    }
})
module.exports = mongoose.model('invoice' , InvoiceSchema );