const AsyncHandler = require('express-async-handler')
const Product = require('../Models/product.model');
const User = require('../Models/user.model')

const cloudinary = require('cloudinary').v2;


const createProduct = AsyncHandler(
    async (req, res) => {
        const { name, sku, category, quantity, price, description } = req.body;

        // Validation
        if (!name || !sku || !category || !quantity || !price || !description) {
            res.status(400);
            throw new Error("Please fill all fields");
        }

        // Handling image upload
        let fileData = {};
        if (req.file) {
            // Save the image to Cloudinary
            let uploadedFile;
            try {
                uploadedFile = await cloudinary.uploader.upload(req.file.path, {
                    folder: "Damascus Inventory",
                    resource_type: "image",
                });

                if (uploadedFile && uploadedFile.secure_url) {
                    console.log("File uploaded successfully:", uploadedFile.secure_url);
                    fileData = { // Only set fileData if the upload was successful
                        fileName: req.file.originalname, // Corrected typo
                        filePath: uploadedFile.secure_url,
                        fileType: req.file.mimetype,
                        fileSize: fileSizeFormatter(req.file.size, 2),
                    };
                } else {
                    console.log("File upload failed.");
                }
            } catch (error) {
                res.status(500);
                throw new Error("Image could not be uploaded");
            }
        } else {
            console.log("No file uploaded.");
        }

        // Create product with or without image data
        const product = await Product.create({
            user: req.user.id,
            name,
            sku,
            category,
            quantity,
            price,
            description,
            image: fileData,
        });

        res.status(201).json({ product });
    }
);


const getProduct = AsyncHandler( async (req,res)=>{
    const product = await Product.findById(req.params.id) 
    console.log("k;jvsaub" + product)

    if(!product){
        res.status(400);
        throw new Error("Product not found!!"); 
    }
    if(product.user.toString() !== req.user.id){
        res.status(401);
        throw new Error("User not Authorized!!"); 
    }

    res.status(200).json(product);
  
});

//get products by id
const getProducts = AsyncHandler(async (req,res)=>{
    const product = await Product.find({user: req.user.id})
    res.status(200).json({product})
});

// Finding all products for admin
const getAll = AsyncHandler(async (req,res)=>{
    const product = await Product.find()
    res.status(200).json({product})
});


//Delete product 

const deleteProduct  = AsyncHandler(async (req,res)=>{
    const product  = await Product.findById(req.params.id);
    if(!product){
        res.status(400);
        throw new Error("Product not found");
    }
    if(product.user.toString() !== req.user.id){
        res.status(401);
        throw new Error("Not Authenticated!!")
    }

    await product.deleteOne();
    res.status(200).json("Product deleted Successfuly!!")
})

module.exports = {createProduct,getProduct,getProducts,getAll,deleteProduct};
