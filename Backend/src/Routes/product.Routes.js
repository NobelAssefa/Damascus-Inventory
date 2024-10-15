const express = require('express');
const {createProduct,getProduct,getProducts,getAll, deleteProduct} = require('../Controller/product.controller');
const router = express.Router();
const authMiddleware = require('../Middlewares/authMiddleware');

const {upload} = require('../Utils/fileUpload')


router.post('/',authMiddleware,upload.single("image"), createProduct);
router.get('/getproduct/:id',authMiddleware, getProduct);
router.get('/getproducts',authMiddleware, getProducts)
router.get('/getall',getAll)
router.post('/deleteproduct/:id',authMiddleware,deleteProduct)
module.exports = router;