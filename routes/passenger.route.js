const router = require('express').Router()
const { chooseSeatValidation , passengerValidation} = require('../middleware/express-validation')
const {createPassenger,chooseSeat} = require('../controller/passengerController')

router.post('/',passengerValidation,createPassenger)
router.patch('/',chooseSeatValidation,chooseSeat)


module.exports = router