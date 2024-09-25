const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please add a name"]
    },

    email:{
        type: String,
        required:[true, "Please provide your email"],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid emaial",
          ],
    },
    password:{
        type: String,
        required:[true, "please add you password"],
        minLength:[6, "password must be at least 6 charchter"],
        maxLenght:[23, "password must not be greater than 23 charachter"]
    },
    photo:{
        type:String,
        required:[true, "please add your photo"],
        default: "https://img.freepik.com/free-photo/3d-rendering-zoom-call-avatar_23-2149556783.jpg?ga=GA1.1.1866633035.1723210103&semt=ais_hybrid"
    },
    phone:{
        type: String,
        default: "+251"
    },
    bio:{
        type: String,
        maxLenght:[250, "bio must not be grater than 250 characters"],
        default:'bio'
    }


},{
    timestamps:true
})



const UserModel = mongoose.model('UserModel', userSchema);


module.exports = UserModel;