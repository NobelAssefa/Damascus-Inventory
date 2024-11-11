const express = require('express');
const {createPurchase, getPurchase, getPurchaseAmount, updatePurchase} = require('../Controller/purchase.controller')
const router = express.Router();
const authMiddleware = require('../Middlewares/authMiddleware');
const { createSales, getSales, getSalesAmount, getMonthlySalesAmount, updateSales } = require('../Controller/sales.controller');

router.post('/',authMiddleware,createSales)
router.get('/getsales',authMiddleware,getSales)
router.get('/getsalesamount',authMiddleware,getSalesAmount)
router.put('/updatesales/:id',authMiddleware,updateSales)
router.get('/getmonthlysalesamount',authMiddleware,getMonthlySalesAmount)


module.exports = router