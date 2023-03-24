const jwt=require('jsonwebtoken')
require('dotenv').config
const tokenverify=(request,response,next)=>{
    let bearertoken=request.headers.authorization
    let token=bearertoken.split(' ')[1]
    try{
        jwt.verify(token,process.env.Secret_key)
        next()
    }
    catch(err){
        response.send({message:"Session expired..Relogin"})
    }
}
module.exports=tokenverify