const express  = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        app.listen(PORT, ()=>{
            console.log(`Server is listening in port ${PORT} `)
        })
    }).catch((err)=>{
        console.log(err)
    })
