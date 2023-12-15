const mongoose= require("mongoose")
const reviewSchema = new mongoose.Schema({
    uid:{
        type:mongoose.Schema.Types.ObjectId
    },
    review :{
        type:String
    }
})

module.exports=new mongoose.model("review",reviewSchema)