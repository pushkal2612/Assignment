const mongoose= require("mongoose")
const express=require("express")
const app=express()
app.use(express.json())
const PORT = 7000

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})

const Product = require("../model/product")
const Category=require("../model/catagories")


const dburl="mongodb+srv://pushkalkhu:1807@cluster0.xhbtcer.mongodb.net/eshopping?retryWrites=true&w=majority"

mongoose.connect(dburl).then(data=>{
    console.log("db connected");
}).catch(err=>{
    console.log(err);
})

// const viewproduct=async()=>{
// try {
//     const data =await Product.aggregate([{$lookup:{

//         from :"catagories",
//         localField:"catid",
//         foreignField:"_id",
//         as :"category"
//     }}])
//     for (var i = 0; i < data.length; i++) {
        
//         console.log(data[i].pname+" "+data[i].category[0].catname);
//     }
   
// } catch (error) {
//     console.log(error);
// }
// }
// const updateProduct = async ()=>{

//    const dt = await Product.findByIdAndUpdate("657be08c55a57aa449927c8c",{price:700})
//     console.log(dt);
// }
const deleteproduct=async()=>{
   try {
    const data = await Product.findByIdAndDelete('657be08c55a57aa449927c8f');
    console.log(data);
   } catch (error) {
    console.log(error);
   }
}

//viewproduct()
//updateProduct()
deleteproduct()

