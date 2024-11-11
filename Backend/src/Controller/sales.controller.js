const AsyncHandler = require('express-async-handler')

const Sales = require("../Models/sales.model")

const createSales = AsyncHandler(
    async(req,res)=>{
        const {StockSold,SaleDate,TotalSaleAmount} = req.body;
        if(!StockSold || ! SaleDate || !TotalSaleAmount){
            res.status(400);
            throw new Error("Please fill fields")
        }

        const sales = await Sales.create({
            user:req.user.id,
            product:req.user,
            store:req.store,
            StockSold:req.body.StockSold,
            SaleDate:req.body.SaleDate,
            TotalSaleAmount:req.body.TotalSaleAmount

        })

        res.status(200).json({sales})
    }
);


const getSales = AsyncHandler(
    async (req,res)=>{
        const sales = await Sales.find({user:req.user.id});
        res.status(200).json({sales})
    }
);


const getSalesAmount = AsyncHandler(
    async(req,res)=>{
        let totalSalesAmount = 0;
        const sales = await Sales.find({user:req.user.id});
        sales.forEach((sale) => {
            totalSalesAmount+=sale.TotalSaleAmount
            
        });

        res.status(200).json({totalSalesAmount})
    }
)



const updateSales = AsyncHandler(
    async(req,res)=>{
        const sales = await Sales.findById(req.params.id);
        if(sales){
            const {user,product,store,StockSold,SaleDate,TotalSaleAmount} = req.body;
            sales.user = req.user;
            sales.product = req.product;
            sales.store = req.store;
            sales.StockSold = req.body.StockSold;
            sales.SaleDate = req.body.SaleDate;
            sales.TotalSaleAmount = req.body.TotalSaleAmount;
            const updatedSales = await sales.save();
            res.status(200).json({
                _id:updatedSales._id || _id,
                StockSold:updatedSales.StockSold || StockSold,
                SaleDate:updatedSales.SaleDate || SaleDate,
                TotalSaleAmount:updatedSales.TotalSaleAmount || TotalSaleAmount,
            })


        }else{
            res.status(400);
            throw new Error("sales not found!!")
        }
    }
)


const getMonthlySalesAmount = AsyncHandler(
    async(req,res)=>{
        const sales = await Sales.find();
        if(sales){
            // Array that holds the sales amount in that month
            const salesAmount = [];
            salesAmount.length =12;
            salesAmount.fill(0);

            sales.forEach((sale)=>{
                //By asumming the date format is "yyyy-mm-dd"
                const monthIndex = parseInt(sale.SaleDate.split("-")[1])-1;

                salesAmount[monthIndex] += sale.TotalSaleAmount;
            });

            res.status(200).json({salesAmount})
        }else{
            res.status(400)
            throw new Error("Sales not found!")
        }
    }
)
module.exports = {createSales,getSales,getSalesAmount,updateSales,getMonthlySalesAmount}