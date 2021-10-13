const fs = require('fs')
const cloudinary = require('cloudinary').v2

cloudinary.config({ 
    cloud_name: 'dhh9obagl', 
    api_key: '733983977383846', 
    api_secret: 'ex-mqCvUAC0QZ-DWXylmpEBC2Qc' 
  });


const upload = (req,res,next)=>{
   try{
    const allowedExtension = ['png','jpg','jpeg'];
    if(!allowedExtension.includes(req.files.avatar.name.split(".")[1])){
        return res.status(422).json({status : "failed", message : "Invalid file extenstion, please use image extension"});
    }

    const file = req.files.avatar
    const path = "/files" + "/images" + file.name;
    file.mv(path,function() {
        if (!file){
            return res.status(500).send("error");
        }
      });

    cloudinary.uploader.upload(path,{
        resource_type : "image"
    })
    .then((result)=>{
        req.pp= result
        next()
    })
    .then(()=>{
        fs.unlink(path, function (err) {
            if (err) throw err;
            // if no error, file has been deleted successfully
            console.log('File deleted!');
        });
    })
    .catch((e)=>{
        return res.status(400).json({status : "failed" , message : "error has occured"})
    })
   }catch(e){
       return res.status(400).json({status : "failed",message : "req.files.avatar is not found / Error has been occured"})
   }
    
}  


module.exports = { upload }