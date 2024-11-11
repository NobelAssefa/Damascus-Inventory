const User = require('../Models/user.model')
const AsyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const Token = require('../Models/token.model')
const sendEmail = require('../Utils/sendEmail')


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
            const { _id, name, email, photo, phone, bio,isAdmin } = user
            res.status(201).json({
                _id, name, email, photo, phone, bio, isAdmin,token
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
        const { email, password } = req.body;
        console.log({ email, password })
        if (!email || !password) {
            res.status(400);
            throw new Error("please enter user credentials")
        }

        // check if a user exists
        const user = await User.findOne({ email })

        if (!user) {
            res.status(400);
            throw new Error('user not found, please signup')
        }
        const passwordExists = await bcrypt.compare(password, user.password)

        const token = generateToken(user._id)

        //SENDING HTTPONLY COOKIE
        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400), // 1day
            sameSite: 'none',
            secure: true

        })



        // check if email and password is correct

        if (user && passwordExists) {
            const { _id, name, email, photo, phone, bio } = user
            res.status(201).json({
                _id, name, email, photo, phone, bio, token
            })
        }
        else {
            res.status(400);
            throw new Error('Invalid credentials')
        }

    }
)

//LOGOUT
const logout = AsyncHandler(async (req, res) => {
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0), // 1day
        sameSite: 'none',
        secure: true

    })
    return res.status(200).json({ message: "successfuly logged out!!!!!" })


})


//GET USER All User
const getAllUsers = AsyncHandler(
    async (req, res) => {
        const users = await User.find(); // 'users' is an array of user objects
        if (users) {
            const usersData = users.map(user => {
                const { _id, name, email, photo, phone, bio } = user;
                return { _id, name, email, photo, phone, bio };
            });
            res.status(201).json(usersData);
        } else {
            res.status(400);
            throw new Error("Something went wrong");
        }
    }
);


//GET USER PROFILE
const getProfile = AsyncHandler(
    async (req, res) => {
        const user = await User.findById(req.user._id)
        if (user) {
            const { _id, name, email, photo, phone, bio } = user
            res.status(201).json({
                _id, name, email, photo, phone, bio
            })
        } else {
            res.status(400);
            throw new Error("user not found!")
        }

    });

// Checking loggedin status
const loggedIn = AsyncHandler(async (req, res) => {

    const token = req.cookies.token;
    if (!token) {
        res.json(false)
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    if (verified) {
        res.json(true)
    } else {
        res.json(true)
    }

})

const updateProfile = AsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        const { name, email, photo, phone, bio } = user;
        user.email = req.email
        user.name = req.body.name || name;
        user.phone = req.body.phone || phone;
        user.photo = req.body.photo || photo;
        user.bio = req.body.bio || bio;
        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id || _id,
            name: updatedUser.name || name,
            email: updatedUser.email || email,
            photo: updatedUser.photo || photo,
            phone: updatedUser.phone || phone,
            bio: updatedUser.bio || bio,
        })
    } else {
        res.status(400);
        throw new Error("User not found!!")
    }

})

const changePassword = AsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    const { oldpassword, password } = req.body;

    if (!user) {
        res.status(400);
        throw new Error("user not found, please signup!")
    }
    if (!oldpassword || !password) {
        res.status(400)
        throw new Error('please add old and new password!!')
    }

    const verifiedPassword = await bcrypt.compare(oldpassword, user.password);
    if (user && verifiedPassword) {
        user.password = password
        user.save()
        res.status(200).send('Password changed successfuly!!!!!')
    } else {
        res.status(400)
        throw new Error("Old password is not correct!!")
    }
});
const resetPassword = AsyncHandler(async (req, res) => {
    const {email} = req.body
    const user  = await User.findOne({email})
    if(!user){
        res.status(400)
        throw new Error("user not found!!")
    }

    //generate a reset token
    const resetToken = crypto.randomBytes(32).toString("hex") + user._id;

    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    await new Token({
        userId: user._id,
        token:hashedToken,
        createdAt: Date.now(),
        expiresAt: Date.now() + 30 * (60 * 1000) // Thirty Minutes
    }).save()

    const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`
    const message = `
        <h1>Hello</h1>
        <p>You requested for a password reset</p>
        <p><Please use the link below to reset a password/p>
        <p>The reset link is only valid for 30 minutes</p>
        <a href = ${resetUrl} clicktracking = false>${resetUrl}</a>
        <p>Regards.....</p>
        <p>DAMASCUS</p>
    `;

    const subject = "Password reset request"
    const send_to = user.email;
    const sent_from = process.env.EMAIL_USER;

    try{
        await sendEmail(subject,message,send_to,sent_from)
        res.status(200).json({success:true, message:"Reset Email sent"})

    }catch{
        res.status(500);
        throw new Error("Email not sent please try again!!");

    }

    

})



module.exports = {
    registerUser,
    login,  
    logout,            
    getProfile,      
    loggedIn,
    updateProfile,
    changePassword,
    resetPassword,
    getAllUsers
};
