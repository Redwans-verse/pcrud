const express=require('express')
const router= express.Router()
const {login,createUser}=require('../controller/userController')
const upload=require('../helper/fileUpload')
const multer = require("multer");
const {create,products}=require('../controller/productController')
const {islogin} = require("../middleware/auth");


router.post('/create',createUser)
router.post('/login',login)
router.post("/uploadfile", upload, (req, res) => {
    const file = req.file;
    if (!file) {
        res.end("please upload image");

    }
    res.end(file.path)
    console.log(file.path)

});


// product route

router.post('/product/create',islogin,upload,create)
router.get('/product/products',islogin,products)








module.exports=router