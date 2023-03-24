const exp=require('express')
const app=exp()
const mongoclient=require("mongodb").MongoClient
require("dotenv").config()
//importing path
const path=require('path')

//connecting to react application
app.use(exp.static(path.join(__dirname,'./build')))

app.use(exp.json())

//connecting database
mongoclient.connect(process.env.DB_connection_url)
.then((client)=>{
        // getting db 
        let db_obj=client.db("travellog")
        //creating collections
        let usercollection=db_obj.collection("usercollection")
        let mapcollection=db_obj.collection("mapcollection")
        //sharing collections to api's
        app.set("usercollection",usercollection)
        app.set("mapcollection",mapcollection)
        console.log("DB Connection successful !!..")
})
.catch(err=>console.log("err in database connection",err))

//importing userapi
const userapi=require('../travellog/APIS/Userapi')
const mapapi=require('../travellog/APIS/mapapi')
//executing middleware according to path
app.use('/user',userapi)
app.use('/mappin',mapapi)
//handling the page refresh
app.use('*',(request,response)=>{
    response.sendFile(path.join(__dirname,'./build/index.html'))
})


//middleware for handling invalid paths
app.use((request,response)=>{
    console.log(error)
    response.send({message:"error occured",reason:`Invalid url ${request.url}`})
})


//middleware for handling errors
app.use((error,request,response,next)=>{
    console.log(error)
    response.send({message:"Error occured",reason:`${error.message}`})
})

//running server
app.listen(process.env.Port,()=>console.log(`server is running on port no : ${process.env.Port}....`))