const mongoose= require("mongoose")
const orderSchema = new mongoose.Schema({
    uid:{
        type:mongoose.Schema.Types.ObjectId
    },
    pid :{
        type:mongoose.Schema.Types.ObjectId
    },
    qty:{
        type : Number
    }
})

module.exports=new mongoose.model("order",orderSchema)