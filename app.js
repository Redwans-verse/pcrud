const express = require("express");
const app = express();
const mongoose = require("mongoose");
var cors = require('cors')

app.use(cors())

require("dotenv").config();

app.use('/images', express.static('images'))
var router= require('./router/userRouter')
app.use(express.json());
app.use('/api/v1',router)


//server port
const port = process.env.PORT || 8000;

//database connection
mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.DATABASE)
    .then(() => {
        app.listen(port, () => {
            console.log("http://localhost:8000");
        });
    })
    .catch((error) => {
        console.log(error.message);
    });