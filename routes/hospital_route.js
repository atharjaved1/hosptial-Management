var express = require('express');
router = express.Router()
const SaveUserRoll_controller = require('../controllers/hospital_controller');
const SaveTokenSale_controller = require('../controllers/token_sale_controller') 


//save user type detail page route
router.post('/UserSave',SaveUserRoll_controller.userroll_saveData);

// JWT Verification token on below router
router.post('/tokensalesave',SaveTokenSale_controller.tokenSale_saveData);

//Find All sale token record
router.get('/findallrecord',SaveTokenSale_controller.findallrec);

//Find token sale by patient name 
router.get('/findbyPateient',SaveTokenSale_controller.findbyPateient);

//Find by Disponcer id
router.post('/dispensar',SaveTokenSale_controller.dispensar);

//Find By year
router.post('/year', SaveTokenSale_controller.findRecordByYear);

//Find by month
router.post('/month', SaveTokenSale_controller.findRecordByMonth);


//Find by between
router.post('/between', SaveTokenSale_controller.FindByBetweenDate);

// Send Verification token for Save user role
router.post('/accesspage',SaveUserRoll_controller.verifyToken,SaveUserRoll_controller.forloggedInAccess);

 
module.exports = router 