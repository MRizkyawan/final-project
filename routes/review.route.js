const router = require('express').Router()
const {isLogin} =require('../middleware/auth')
const {createReview,findUserHistory} = require('../controller/reviewController')

router.post('/:orderId',isLogin,createReview)
router.get('/',isLogin,findUserHistory)

module.exports = router