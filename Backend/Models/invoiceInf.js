const mongoose = require("mongoose");
const {Schema} = mongoose;
const InvoiceSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
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
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client',
        required: true,
      },
    items:{
        quantity: Number,
        price : String,
        amount : String
    }
})
module.exports = mongoose.model('invoice' , InvoiceSchema );