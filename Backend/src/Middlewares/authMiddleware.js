const User = require('../Models/user.model')
const AsyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const authMiddleware = AsyncHandler(
    async (req, res, next) => {
        try {
            const token =  req.cookies.token
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
            req.user = user
            next();
        } catch {
            res.status(401)
            throw new Error("Not authenticated, please login !!")
        }
    }
);




module.exports = authMiddleware;