const mongoose= require("mongoose")
const express=require("express")
const app=express()
app.use(express.json())
const PORT = 7000

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})

const dburl="mongodb+srv://pushkalkhu:1807@cluster0.xhbtcer.mongodb.net/eshopping?retryWrites=true&w=majority"

mongoose.connect(dburl).then(data=>{
    console.log("db connected");
}).catch(err=>{
    console.log(err);
})


app.use("/users",require("../router/userrouter"))





