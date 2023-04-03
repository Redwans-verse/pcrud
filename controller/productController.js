const Products= require('../model/productModel')
const slugify= require('slugify')
// create product

exports.create=async (req,res)=>{
    const {user,productName,qty,unitPrice}= req.body

    const totalPrice= qty*unitPrice
    const file = req.file;
    const userid=req.user._id
    try {
        if (!productName || !qty || !unitPrice) {
            return res.json({ error: "Required fields" });
        }

        if (!file) {
            return res.json({ error: "iamge upload failed" });
        }

        const product= await Products.create({
            user:userid,
            productName:productName,
            productSlug:slugify(productName),
            img:file.path,
            qty:qty,
            unitPrice:unitPrice,
            totalPrice:totalPrice

        })
        return res.json({ data: product});



    }catch (error){
        return res.status(401).json({ msg: error.message });
    }
}

//find product by user
exports.products=async (req,res)=>{
    const userid=req.user._id
    try {
        const products= await Products.find({user:userid})
            .populate('user')

        console.log(products)
        return res.json(products)
    }catch (error) {
        return res.status(401).json({ msg: error.message });
    }
}