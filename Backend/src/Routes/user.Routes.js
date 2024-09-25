const express = require('express');
const router = express.Router();
const {registerUser} = require('../Controller/user.controller')

router.post('/register', registerUser);

module.exports = router;