
const { User , Password, sequelize } = require('../models')
const { checkPassword } =require('../helper/encryption')
const { sign } = require('jsonwebtoken')
const { valResult } = require('../middleware/express-validation');



async function createUser(req,res,next){
    try{
        valResult(req,res)
        const exam = await User.findAll({
            where : {
                email : req.body.email
            }
        })
        if(exam.length >0 ) return res.status(400).json({status : "failed", message :"email has already registered"}) 

        req.users = await User.create({
            "username" : req.body.username,
            "email" : req.body.email,
            "birthday" : req.body.birthday,
            "password" : req.body.password,
            "profile_picture" : req.body.profile_picture,
            "roles" : "user"
        })
        next()
    }catch(e){
        return res.status(400).json({status : "failed", message : "Something missing" })
    }
}

async function uploadPicture(req,res){
    await User.update({
        profile_picture :req.pp.url
    },{
        where : {
            id : req.user.dataValues.id
        }
    })
    return res.status(200).json({status :"success", data :req.pp.url})
}

async function getUserData(req,res){
    const result = await User.findAll({
        include: [Password] 
    })
    res.json(result[0])
}


async function login (req,res){
    let token ;
    const options = {
        expire: new Date().setDate(Date.now()+30),
        httpOnly: true,
      };  
    try{
        valResult(req,res)
        const user = await User.findAll({
            include : [Password] ,
            where : {
                email : req.body.email
            }
        })
        
        if(checkPassword(req.body.password,user[0].Password.password)){
            delete user[0].dataValues.Password
            token = sign(user[0].dataValues,process.env.JWT_SECRET)
            return res.status(200).cookie("token",token,options).json({status : "success", token : token})
        }else throw new Error
    }catch(e){
        return res.status(400).json({status :"failed", message : "username/password is wrong"})
    }
}

module.exports = { login , createUser,getUserData , uploadPicture}