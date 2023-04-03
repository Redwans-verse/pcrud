const mongoose=require('mongoose')
const { Schema }=mongoose
const { ObjectId } = mongoose.Schema;


const productSchema= new Schema({

    user:{  type:ObjectId,
        required:true,
        ref:"User",
    },
    productName:{
        type:String,
        required:true,
    },
    productSlug:{
        type:String,
        required:true,
    },
    img:{
        type:String,
    },
    qty:{
        type:Number,
    },
    unitPrice:{
        type:Number,
    },
    totalPrice:{
        type:Number,
    },
    CreatedDate:{
        type:Date,default:Date.now()
    }

},{
    timestamps: true,versionKey:false
});


const Products= mongoose.model('Products',productSchema)

module.exports=Products

