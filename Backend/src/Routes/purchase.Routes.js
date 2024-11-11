const express = require('express');
const {createPurchase, getPurchase, getPurchaseAmount, updatePurchase} = require('../Controller/purchase.controller')
const router = express.Router();
const authMiddleware = require('../Middlewares/authMiddleware');


router.post('/',authMiddleware, createPurchase);
router.get('/getpurchase',authMiddleware, getPurchase);
router.get('/getpurchaseamount',authMiddleware, getPurchaseAmount);
router.put('/updatepurchase/:id',authMiddleware, updatePurchase);


module.exports = router;