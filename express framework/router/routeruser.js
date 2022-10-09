var express=require("express");
var usercontroller=require("../controller/usercontroller");
var router=express.Router();

router.get('/list',usercontroller.getUser);
router.get('/getUserbyName',usercontroller.getUserbyName);
router.post('/adduser',usercontroller.addUser);
router.post('/updateuser',usercontroller.updateUser);

module.exports=router;
