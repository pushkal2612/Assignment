const jwt= require("jsonwebtoken")
const user =require("../model/users")

const auth=async(req,resp,next)=>{
    try {
         const token=req.cookies.jwt
         const data=await jwt.verify(token,process.env.pkey)
         const userdata=await user.findOne({_id:data._id})
         const tokendata=userdata.Tokens.find(ele=>{
            return ele.token==token
         })
         if(tokendata==undefined)
         {
            resp.render("login",{err:"please login first"})
            return;
         }
         if (data) {
            req.user=userdata;
            req.token=token
            next()
         }

    } catch (error) {
        console.log(error);
    }
}

module.exports =auth