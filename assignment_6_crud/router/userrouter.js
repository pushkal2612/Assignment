const router =require("express").Router()
const multer=require("multer")
const bcrypt=require("bcryptjs")
const fs=require("fs")
const auth=require("../middleware/auth")
const user=require("../model/users")
const { log } = require("console")

var storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./public/profile")
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+"-"+ Date.now()+".jpg")
    }
})
var upload = multer({
    storage:storage
}).single("image")

router.get("/",(req,resp)=>{
    resp.render("login")
})

router.get("/reg",(req,resp)=>{
    resp.render("registration")
})

router.get("/home",auth,async(req,resp)=>{
    try {
        const user1 =await user.find();
        resp.render("home",{userdata:user1})
    } catch (error) {
        console.log(error);
    }
})

router.post("/adduser",upload,async(req,resp)=>{
    try {
        const user1 =new user({uname:req.body.uname,email:req.body.email,pass:req.body.pass,img:req.file.filename})
        const data=await user1.save()
        resp.render("registration",{"msg":"successfully registered"})
    } catch (error) {
        console.log(error);
    }
})

router.post("/userlogin",async(req,resp)=>{
    try {
        const user1=await user.findOne({email:req.body.email})
    
        if (user1.Tokens.length>6) {
            resp.render("login",{"err":"maximum user limit reached"})
            return;
        }
        var isValid = await bcrypt.compare(req.body.pass,user1.pass)
       
        if (isValid) {
         
            const token=await user1.generateToken()
            resp.cookie("jwt",token)
            resp.redirect("home")
        }
        else{
            resp.render("login",{"err":"invalid credential"})
        }
    } catch (error) {
        console.log(error);
    }
})

router.get("/delete",async(req,resp)=>{
    try {
        const did=req.query.did;
        const data=await user.findByIdAndDelete(did);
        fs.unlinkSync("./public/profile/"+data.img)
        resp.redirect("home")
    } catch (error) {
        console.log(error);
    }
})

router.get("/update",async(req,resp)=>{
    try {
        const uid=req.query.uid;
        const data =await user.findById(uid)
        resp.render("update",{udata:data})
    } catch (error) {
        console.log(error);
    }
})

router.post("/updateuser",upload,async(req,resp)=>{
    try {
        const id=req.query.id;
        const data =await user.findByIdAndUpdate(id,{uname:req.body.uname,email:req.body.email,img:req.file.filename})
        fs.unlinkSync("./public/profile/"+ data.img);
        resp.redirect("home")
    } catch (error) {
        console.log(error);
    }
})

router.get("/logout",auth,async(req,resp)=>{
    var user =req.user
    var token=req.token
    try {
        user.Tokens= user.Tokens.filter(ele=>{
            return ele.token !=token
        })
        await user.save()
        resp.clearCookie("jwt")
        resp.render("login")
    } catch (error) {
        console.log(error);
    }
})

router.get("/logoutall",auth,async(req,resp)=>{
    var user =req.user
    var token=req.token
    try {
        user.Tokens=[];
        await user.save();
        resp.clearCookie("jwt");
        resp.render("login")
    } catch (error) {
        console.log(error);
    }
})

module.exports=router