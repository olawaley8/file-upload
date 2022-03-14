const express= require('express');
const app= express();
const multer= require('multer');
const path= require('path');

//storage engine
const storage= multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,callback)=>{
        return callback(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload= multer({
    storage: storage,
    limits:{
        fileSize:1000000
    }
})

app.use('/profile',express.static('/upload/images'))

app.post('/upload', upload.single('profile'), (req,res)=>{
    res.json({
        success:1,
        profile_url:`http://localhost:${port}/profile/${req.file.filename}`
    })
function errHandler(err,req,res,next){
    if(err instanceof multer.MulterError){
        res.json({
            success:0,
            message:err.message
        })
    }
app.use(errHandler())
}


})
const port= process.env.port||4000
app.listen(port, ()=>{
    console.log('server up and running')
})