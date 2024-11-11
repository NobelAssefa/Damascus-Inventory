const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middlewares/authMiddleware');
const { createStore, getStore } = require('../Controller/store.controller');



router.post('/',authMiddleware, createStore);
router.get('/getstore',authMiddleware, getStore);


module.exports = router