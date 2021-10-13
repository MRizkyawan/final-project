const { User , Password, sequelize } = require('../models')

const { encrypt } =require('../helper/encryption')

async function createPassword (req,res){

    try{
        await Password.create({
            password :encrypt(req.body.password) ,
            user_id : req.users.dataValues.id
        })
        return res.status(200).json({status:"success",message : "user has been created !"})
    }catch(e){
        return res.status(400).json({status:"failed", message: "error has occured"})
    
    }
}

module.exports = { createPassword}