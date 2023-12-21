const express=require("express")
const app=express()
require("dotenv").config()
const PORT=process.env.PORT
const DBURL=process.env.DBURL
const hbs=require("hbs")
const path=require("path")
const mongoose=require("mongoose")
const bodyparser=require("body-parser")
const cookieparser=require("cookie-parser")
const { log } = require("console")
app.use(bodyparser())
app.use(cookieparser())
mongoose.connect(DBURL).then(data=>{
    console.log("DATABASE Connected");
})
app.listen(PORT,()=>{
    console.log(`server running on Port ${PORT}`);
})

const viewpath =path.join(__dirname,"../templetes/views")
const partialpath=path.join(__dirname,"../templetes/partials")
const publicpath=path.join(__dirname,"../public")

app.set("view engine","hbs")
app.set("views",viewpath)
app.use(express.static(publicpath))
hbs.registerPartials(partialpath)
app.use("/",require("../router/userrouter"))
