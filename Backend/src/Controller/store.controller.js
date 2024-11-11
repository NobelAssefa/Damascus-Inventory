const AsyncHandler = require('express-async-handler')

const Store = require('../Models/store');



const createStore = AsyncHandler(
    async(req,res)=>{
        const{name, category,address,city,image} = req.body;
        console.log({name, category,address,city,image});
        
        if(!name || !category || !address || !city ){
            res.status(400);
            throw new Error("Please fill all fields");
        }

        const store = await Store.create({
            user:req.user.id,
            product:req.product,
            name:req.body.name,
            category:req.body.category,
            address:req.body.address,
            city:req.body.city,
            image:req.body.image
        });

        res.status(200).json({store})
    }
);

const getStore = AsyncHandler(
    async(req,res)=>{
        const store = await Store.find({user:req.user.id});
        res.status(200).json({
            store
        })
    }
)

module.exports = {createStore,getStore}