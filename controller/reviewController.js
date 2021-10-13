const { UserReview ,Order } = require("../models")


async function createReview(req,res){
    await UserReview.create({
        "rating" : req.body.rating,
        "review" : req.body.review,
        "user_id" : req.user.dataValues.id,
        "order_id" : req.params.orderId

    })
    return res.status(200).json({status : "success"})
}

async function findUserHistory(req,res){
    const review = await UserReview.findAll({
        where : {
            user_id : req.user.dataValues.id
        },
        include : [{
            model: Order,
            where:{
                order_status : "success"
            }
        }]
    })
    res.send(review)
}


module.exports = {createReview ,findUserHistory}