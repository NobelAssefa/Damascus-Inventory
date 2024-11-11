const User = require('../Models/user.model')
const Product = require('../Models/product.model')
const AsyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken');
const Store = require('../Models/store');

const authMiddleware = AsyncHandler(
    async (req, res, next) => {
        try {
            const token = req.cookies.token
            if (!token) {
                res.status(401);
                throw new Error("You're not authorized")
            }
            //verify token
            const verified = jwt.verify(token, process.env.JWT_SECRET)
            const user = await User.findById(verified.id).select("-password")
            if (!user) {
                res.status(401)
                throw new Error("User Not Found")
            }
            req.user = user;
            const product = await Product.findOne({ user: req.user });
            if (!product) {
                res.status(404);
                throw new Error("No product found for this user");
            }
            // Attach product to request
            req.product = product.id;

            const store = await Store.findOne({ user: req.user });
            if (!store) {
                res.status(404);
                throw new Error("No Store found for this user");
            }
            // Attach product to request
            req.store = store.id;
            console.log(req.store);
            
        
            
            next();
        } catch {
            res.status(401)
            throw new Error("Not authenticated, please login !!")
        }
    }
);




module.exports = authMiddleware;