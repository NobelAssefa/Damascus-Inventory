const express = require('express');
const router = express.Router();
const {registerUser,login,logout,getProfile,loggedIn,updateProfile,changePassword, resetPassword, getAllUsers, refereshToken} = require('../Controller/user.controller');
const authMiddleware = require('../Middlewares/authMiddleware');

router.post('/register', registerUser);
router.post('/login', login)
router.post('/logout', logout)
router.get('/profile',authMiddleware, getProfile)
router.get('/getalluser', getAllUsers)
router.get('/token/refresh', refereshToken)
router.post('/loggedin', loggedIn)
router.patch('/updateprofile', authMiddleware,updateProfile)
router.patch('/changepassword', authMiddleware,changePassword)
router.post('/resetpassword',resetPassword)


module.exports = router;