const { Order } = require('../models')



async function createOrder(req,res){
    await Order.create(req.body)
    return res.status(200).json({status:"success",message : "Order has been created !"})
}


module.exports ={ createOrder }