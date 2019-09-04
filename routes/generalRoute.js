var express = require('express');
router = express.Router()
const LoginController = require('../controllers/login_controller') 

//login user (Atuntication)
router.post('/login', LoginController.userlogin);




module.exports = router 