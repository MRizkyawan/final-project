const router = require('express').Router()
const userRoute = require('./user.route')
const passengerRoute = require('./passenger.route')
const orderRoute = require('./order.route')
const reviewRoute = require('./review.route')
const busProviderRoute = require('./busProvider.route')
const {isLogin} = require('../middleware/auth')


router.use('/user',userRoute)
router.use('/passenger',isLogin,passengerRoute)
router.use('/review',reviewRoute)
router.use('/order',orderRoute)
router.use('/busprovider',busProviderRoute)

module.exports = router