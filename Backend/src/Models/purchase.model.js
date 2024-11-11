const mongoose = require('mongoose')

const purchaseSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Product"
    },
    quantityPurchased:{
        type:Number,
        required:true,
    },
    purchaseDate:{
        type:String,
        required:true
    },
    TotalPurchaseAmount:{
        type:Number,
        required:true,
    },
},
{timestamps:true});

const Purchase = mongoose.model("Purchase", purchaseSchema);
module.exports = Purchase;