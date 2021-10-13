const router = require('express').Router()
const {createUser,login, getUserData ,uploadPicture} = require('../controller/userController')
const {createPassword} = require("../controller/passwordController")
const {isLogin , authorize} =require('../middleware/auth')
const { upload } = require('../middleware/uploadfile')
const { userLoginValidation,userRegisterValidation } = require('../middleware/express-validation')



router.post('/register',userRegisterValidation,createUser,createPassword)
router.post('/login',userLoginValidation,login)
router.get('/',isLogin,authorize("user"),getUserData)
router.post('/updatePicture',isLogin,upload,uploadPicture)

module.exports = router