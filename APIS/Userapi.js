const exp=require("express")
const userapi=exp.Router()
const expressAsyncHandler=require("express-async-handler")
require("dotenv").config()
userapi.use(exp.json())
//importing bcryptjs
const bcryptjs=require("bcryptjs")
//importing jsonwebtoken to create token
const jwt=require("jsonwebtoken")

//router for login
userapi.post('/login',expressAsyncHandler(async(request,response)=>{

    //getting usercollection
    let usercollection=request.app.get("usercollection")
    //getting usercredentials from usercollection
    let usercred=request.body
    //finding user exists or not
    let userdb=await usercollection.findOne({username:usercred.username})
    if(userdb===null){
        response.send({message:"User Not Found"})
    }
    else{
        //comparing password
        let status=await bcryptjs.compare(usercred.password,userdb.password)
        if(status==false){
            response.send({message:"Invalid password"})
        }
        else{
            //creating token
            let token=jwt.sign({username:userdb.username},process.env.Secret_key,{expiresIn:11000})
            //sending token to user
            response.send({message:"Login Successful",payload:token,userobj:userdb})
        }
    }
}))

//router for register
userapi.post('/register',expressAsyncHandler(async(request,response)=>{

    //getting usercollection
    let usercollection=request.app.get("usercollection")
    //userobj from client
    let newuserobj=request.body
    //searching for the user
    let userobj=await usercollection.findOne({username:newuserobj.username})
    if(userobj!=null){
        response.send({message:"User Already Exists"})
    }
    else{
        //hashing the password
       let hashedpassword=await bcryptjs.hash(newuserobj.password,10)
       newuserobj.password=hashedpassword
       //inserting into the usercollection
       await usercollection.insertOne(newuserobj)
       response.send({message:"User Created Successfully"})
    }
}))

//exporting userapi
module.exports=userapi;