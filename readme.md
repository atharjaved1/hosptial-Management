# Login 
//save user type detail page route
router.post('/UserSave',SaveUserRoll_controller.userroll_saveData);

localhost:5000/api/UserSave

{
	"rolltype":"Dispencer",
	"name":"Athar",
	"email":"asad@uos.com",
	"password":"asad"
}



# Authentication 
// JWT Verification token on below router

localhost:5000/login

router.post('/tokensalesave',SaveTokenSale_controller.tokenSale_saveData);

{
    "user": {
        "_id": "5d6fbf7726b24836a0219890",
        "rolltype": "Dispencer",
        "name": "Athar",
        "email": "athar@yopmail.com",
        "password": "$2a$10$LCTyz0MYffLcDL0MZ0XxqOWe70c8C7A0Qht8RXacQgunBv3StkufC",
        "__v": 0,
        "enterdate": "2019-09-04T17:58:51.799Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVkNmZiZjc3MjZiMjQ4MzZhMDIxOTg5MCIsInJvbGx0eXBlIjoiRGlzcGVuY2VyIiwibmFtZSI6IkF0aGFyIiwiZW1haWwiOiJhc2FkQHVvcy5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCRMQ1R5ejBNWWZmTGNETDBNWjBYeHFPV2U3MGM4QzdBMFFodDhSWGFjUWd1bkJ2M1N0a3VmQyIsIl9fdiI6MCwiZW50ZXJkYXRlIjoiMjAxOS0wOS0wNFQxNzo1ODo1MS43OTlaIn0sImlhdCI6MTU2NzYxOTkzMiwiZXhwIjoxNTY3NjIyOTMyfQ.Y7G-DlPT68kDV4v0FPkk_2pNRUa7zyJxABCNA0fMxDg"
}

#Token Sale to Doctor and patient

localhost:5000/api/tokensalesave

{
	 
	"patientname":"gsaul"
}

#  Find token sale by patient name 

router.get('/findbyPateient',SaveTokenSale_controller.findbyPateient);

localhost:5000/api/findbyPateient
{
	"patientname":"asif"
}

# Find by Disponcer id
router.post('/dispensar',SaveTokenSale_controller.dispensar);

localhost:5000/api/dispensar

{
		"userid":"5d6fbf7726b24836a0219890"
}

# Find By Date 

# Find by month

router.post('/month', SaveTokenSale_controller.findRecordByMonth)

localhost:5000/api/month
{
	"month" : 09
}

# Find By year
router.post('/year', SaveTokenSale_controller.findRecordByYear)
localhost:5000/api/year

{
	"year" : 2019
} 

# Find by between
localhost:5000/api/between
router.post('/between', SaveTokenSale_controller.FindByBetweenDate)

{
	"FromDate":"2018-09-04",
	"lastDate":"2023-09-04"
}

# Find All Record
//Find All sale token record
router.get('/findallrecord',SaveTokenSale_controller.findallrec);
localhost:5000/api/findallrec



#// Send Verification token for Save user role
router.post('/accesspage',SaveUserRoll_controller.verifyToken,SaveUserRoll_controller.forloggedInAccess);