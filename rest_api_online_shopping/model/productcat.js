const mongoose= require("mongoose")
const productcatschema = new mongoose.Schema({
    catname:{
        type : String
    }   
})

module.exports=new mongoose.model("category",productcatschema)