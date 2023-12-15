const router=require("express").Router()
const User=require("../model/user")

router.get("/",async(req,resp)=>{
    try {
        const data=await User.find();
        resp.send(data)
    } catch (error) {
        console.log(error);
    }
})

router.post("/",async(req,resp)=>{
    try {
        const user=new User(req.body)
        const data=await user.save()
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }
})

router.put("/:id",async(req,resp)=>{
    const uid=req.params.id;
    try {
        const data=await User.findByIdAndUpdate(uid,req.body);
        resp.send(data)
    } catch (error) {
        console.log(error);
    }
})

router.delete("/:id",async(req,resp)=>{
    
    const uid = req.params.id
    try {
        const data = await User.findByIdAndDelete(uid);
        resp.send(data)
    } catch (error) {
        console.log(error);
    }


})

module.exports=router