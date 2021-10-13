const { Passenger } = require('../models')
const { valResult } = require('../middleware/express-validation');

async function createPassenger(req,res){
    try{
        valResult(req,res)
        const passenger = await Passenger.create(req.body)
        return res.status(200).cookie("passenger",passenger).json({status : "success" , message : "Passenger detail is created !"})
    }
    catch(e){
        return res.status(400).json({status:"failed", message:"Error has been occured !"})
    }
}

async function chooseSeat(req,res){

    try{
        valResult(req,res)
        const seat = await Passenger.update({choosen_seat : req.query.seat},{
            where : {
                id : req.cookies.passenger.id
            }
        })
        return res.status(200).json({status : "success", message :"seated has been choosen"})
    }catch(e){
        return res.status(400).json({status:"failed" ,message : "Error has occured"})
    }
}
    
 


module.exports = {createPassenger,chooseSeat}