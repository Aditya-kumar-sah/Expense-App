const express = require('express')
const { loginController, registerController } = require('../controllers/userController')

//router object
const router = express.Router()

//router
//POST || LOGIN
router.post('/login',loginController) //post url se ni dikhta voo body mei dikhta hai postman yaa thunderclient kee

//POST || REGISTER
router.post('/register',registerController)
 
module.exports = router