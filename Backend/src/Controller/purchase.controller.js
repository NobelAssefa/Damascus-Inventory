const AsyncHandler = require('express-async-handler')
const Product = require('../Models/product.model')
const User = require('../Models/user.model')
const Purchase = require('../Models/purchase.model')


const createPurchase = AsyncHandler( async(req,res)=>{
    const {quantityPurchased,purchaseDate,TotalPurchaseAmount} = req.body;
    
    if (!quantityPurchased || !purchaseDate || !TotalPurchaseAmount) {
        res.status(400);
        throw new Error("Please fill all fields");
    }

    //Creating purchase
    const purchase = await Purchase.create({
        user:req.user.id,
        product:req.product,
        quantityPurchased: req.body.quantityPurchased,
        purchaseDate: req.body.purchaseDate,
        TotalPurchaseAmount: req.body.TotalPurchaseAmount,
    });

    res.status(200).json({purchase})
})

// Get All Purchases
const getPurchase = AsyncHandler(
    async(req,res)=>{
        const purchase = await Purchase.find({user:req.user.id})
        res.status(200).json({purchase})
    }
)

const getPurchaseAmount  = AsyncHandler(
   
    async(req,res)=>{
        let totalPurchaseAmount = 0;
        const purchases = await Purchase.find({user:req.user.id})
        console.log(purchases)
        purchases.forEach((purchase) => {
            totalPurchaseAmount += purchase.TotalPurchaseAmount  
        });

        res.status(200).json({totalPurchaseAmount})
        
    }
)


const updatePurchase = AsyncHandler(
   
    async(req,res)=>{
        const purchase = await Purchase.findById(req.params.id)
        if(purchase){
            const {user,product,quantityPurchased,purchaseDate,TotalPurchaseAmount} = req.body;
            purchase.user = req.user;
            purchase.product = req.product;
            purchase.quantityPurchased = req.body.quantityPurchased;
            purchase.purchaseDate = req.body.purchaseDate;
            purchase.TotalPurchaseAmount = req.body.TotalPurchaseAmount;
            const updatedPurchase = await purchase.save();
            res.status(200).json({
                _id:updatedPurchase._id || _id,
                quantityPurchased:updatedPurchase.quantityPurchased || quantityPurchased,
                purchaseDate:updatedPurchase.purchaseDate || purchaseDate,
                TotalPurchaseAmount:updatedPurchase.TotalPurchaseAmount || TotalPurchaseAmount,
            })

        }else{
            res.status(400);
            throw new Error("purchase not found!!")
        }

    }
)
module.exports = {createPurchase,getPurchase,getPurchaseAmount,updatePurchase} 