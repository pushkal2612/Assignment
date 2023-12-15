const mongoose= require("mongoose")
const UserSchema = new mongoose.Schema({
    uname:{
        type : String
    },
    email :{
        type : String
    },
    pass:{
        type : String
    }
})

module.exports=new mongoose.model("User",UserSchema)
