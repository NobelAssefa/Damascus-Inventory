const express  = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const userRoutes = require('./src/Routes/user.Routes')
const errorHandler = require('./src/Middlewares/errorHandler')



const app = express();
dotenv.config();

// MIDDLEWARES
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());

//Routes
app.use("/api/users", userRoutes)

app.get("/", (req,res)=>{
    res.send("Home Page")  
})

app.use(errorHandler)

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        app.listen(PORT, ()=>{
            console.log(`Server is listening on port ${PORT}`)
        })
    }).catch((err)=>{
        console.log(err)
    })

