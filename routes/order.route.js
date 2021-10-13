const router = require('express').Router()
const {createOrder} = require('../controller/orderController')

router.post('/',createOrder)

module.exports = router