const User = require('../Models/user.model')
const AsyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" })

}

//USER REGISTRATION
const registerUser = AsyncHandler(
    async (req, res) => {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            res.status(400);
            throw new Error("Please fill all required forms");

        }
        if (password.length < 6) {
            res.status(400);
            throw new Error("password must be greater than 6 characters")
        }


        const userExist = await User.findOne({ email })
        if (userExist) {
            res.status(400);
            throw new Error("email is already registerd!")
        }

        const user = await User.create({
            name,
            email,
            password
        })


        const token = generateToken(user._id)

        //SENDING HTTPONLY COOKIE
        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400), // 1day
            sameSite: 'none',
            secure: true

        })

        if (user) {
            const { _id, name, email, photo, phone, bio } = user
            res.status(201).json({
                _id, name, email, photo, phone, bio, token
            })
        } else {
            res.status(400);
            throw new Error("Invalid user!")
        }

    }
)

// LOGIN

const login = AsyncHandler(
    async (req, res) => {
        const {email, password} = req.body;
        console.log({email,password})
        if(!email || !password){
            res.status(400);
            throw new Error("please enter user credentials")
        }
        
        // check if a user exists
        const user = await User.findOne({email})

        if(!user){
            res.status(400);
            throw new Error('user not found, please signup')
        }
        const passwordExists = await bcrypt.compare(password, user.password)
        
        // check if email and password is correct
        
        if(user && passwordExists){
            const { _id, name, email, photo, phone, bio } = user
            res.status(201).json({
                _id, name, email, photo, phone, bio, token
            })
        }
        else{
            res.status(400);
            throw new Error('Invalid credentials')
        }

    }
)

module.exports = { registerUser, login };