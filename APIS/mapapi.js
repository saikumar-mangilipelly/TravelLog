const exp = require('express')
const mapapi = exp.Router()
const tokenverify = require('./middlewares/tokenverify')
var cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')
const { ObjectId } = require('mongodb')

mapapi.use(exp.json())

const expressAsyncHandle = require('express-async-handler')

cloudinary.config({
    cloud_name: "dhha5rmnh",
    api_key: "752776913722138",
    api_secret: "N9rDb48JR0jwm0uFt4TgtTcLpZ4",
    secure: true,
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: "travellog",
            public_id: file.fieldname + '-' + Date.now()
        }
    }
})

const upload = multer({ storage: storage })

mapapi.post('/mapreview', upload.single("photo"), expressAsyncHandle(async (request, response) => {
    let mapcollection = request.app.get("mapcollection")
    let mapobj = JSON.parse(request.body.mapdata)
    let lat = mapobj.lat
    let long = mapobj.long
    mapobj.piclink = request.file.path
    mapobj._id = new ObjectId()
    delete mapobj.photo
    delete mapobj.lat
    delete mapobj.long
    let newmapobj = {
        "pin": [lat, long],
        "reviews": [mapobj]
    }
    let isthere = await mapcollection.countDocuments({ pin: [lat, long] })
    try {
        if (isthere === 0) {
            await mapcollection.insertOne({ pin: [lat, long], reviews: [mapobj] })
            response.send({ message: "Review Added Successfully", payload: { newmapobj } })
        }
        else {
            await mapcollection.updateOne({ pin: [lat, long] }, { $push: { reviews: mapobj } })
            response.send({ message: "Review Updated", payload: { newmapobj } })
        }
    }
    catch (error) {
        console.log(error)
    }
}))

mapapi.get('/allpins', expressAsyncHandle(async (request, response) => {
    let mapcollection = request.app.get("mapcollection")
    let pins = await mapcollection.find().toArray()
    response.send(pins)
}))

mapapi.put('/yourpins', expressAsyncHandle(async (request, response) => {
    let mapcollection = request.app.get("mapcollection")    
    let username = request.body.username
    try {
        let doccount = await mapcollection.countDocuments({"reviews.user":username})        
        if (doccount !== 0) {
            let yourreviews = await mapcollection.aggregate([{
                $match: {
                    "reviews.user": username
                }
            }, {
                $project: {
                    reviews: {
                        $filter: {
                            input: "$reviews", as: "reviewuser", cond: { $eq: ["$$reviewuser.user", username] }
                        }
                    }
                }
            }]).toArray()                        
            response.send({ message: "Data found", payload: yourreviews })           
        }
        else{
            response.send({message:"No data found"})
        }
    }
    catch (err) { console.log(err) }
}))

mapapi.delete('/deletereview/:id', expressAsyncHandle(async (request, response) => {
    let mapcollection = request.app.get("mapcollection")
    let id = request.params.id
    try {
        let update={$pull:{reviews:{_id:ObjectId(id)}}}
        let deletedreview = await mapcollection.updateOne({"reviews._id":ObjectId(id)},update)  
        await mapcollection.deleteMany({reviews:{$exists:true,$size:0}})            
        if (deletedreview.modifiedCount > 0)
            response.send({ message: "Deleted successfully" })
        else
            response.send({message:"Deleted Unsuccessful"})
    }
    catch (err) { console.log(err) }
}))

mapapi.get('/privateroute', tokenverify, (request, response) => {
    response.send({ message: "success" })
})

module.exports = mapapi