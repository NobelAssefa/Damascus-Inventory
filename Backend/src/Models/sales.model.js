const mongoose = require('mongoose');

const salesSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product"
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Store"
    },
    StockSold: {
        type: Number,
        required: true,
    },
    SaleDate: {
        type: String,
        required: true,
    },
    TotalSaleAmount: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true
})

const Sales = mongoose.model("Sales", salesSchema)

module.exports = Sales;