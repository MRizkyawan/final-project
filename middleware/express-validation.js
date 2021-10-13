
const { body ,validationResult , query } = require('express-validator');




const userRegisterValidation=[
    body("username")
        .isString()
        .notEmpty()
        .isLength({min:5}),
    body("email")
        .isEmail()
        .notEmpty(),
    body("birthday")
        .isDate()
        .notEmpty(),
    body("password")
        .isString()
        .notEmpty()
        .isLength({min:5}),
    body("profile_picture")
        .isString()
        .notEmpty(),
   
]
const userLoginValidation= [
    body("email")
        .isEmail()
        .notEmpty(),
    body("password")
        .isString()
        .notEmpty()
        .isLength({min:6})
]

const passengerValidation= [
    body("fullname")
        .isString()
        .notEmpty()
        .isLength({min:6}),
    body("email")
        .isEmail()
        .notEmpty(),
    body("age")
        .isInt()
        .notEmpty(),
    body("phone")
        .isString()
        .notEmpty()
]

const chooseSeatValidation = [
    query("seat")
        .notEmpty()
        .isInt({min: 1 , max:20})
]


const valResult = (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
}



module.exports = {userLoginValidation ,userRegisterValidation,chooseSeatValidation,passengerValidation,valResult}