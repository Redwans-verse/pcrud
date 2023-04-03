const mongoose=require('mongoose')
const { Schema }=mongoose


const userSchema= new Schema({

    name:{  type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    address:{
        type:String,
        default:"address"
    },
    role:{
        type:Number,
        default:0
    }

},{
    timestamps: true,versionKey:false
});


const User= mongoose.model('User',userSchema)

module.exports=User

