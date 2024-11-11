const mongoose = require('mongoose')


const productSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        name: {
            type: String,
            required: [true, "please add your name"],
            trim: true

        },
        stock: {
            type: Number,
            required: true,
            default:0,
          },
        sku: {
            type: String,
            required: true,
            default: "SKU",
            trim: true
        },
        category: {
            type: String,
            required: [true, "please add a qunatity"],
            trim: true
        },
        quantity: {
            type: String,
            required: [true, "Please add a quantity"],
        
        },
        price: {
            type: String,
            required: [true, "Please add a price"],
            trim: true
        },
        description: {
            type: String,
            required: [true, "please add a description"],
            trim: true
        },
        image: {
            type: Object,
            default: {}
        }
    },
    {
        timestamps:true,
    }
);

const productModel = mongoose.model("productModel", productSchema)
module.exports = productModel;