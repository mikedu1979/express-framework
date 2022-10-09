var express=require("express");
var router=express.Router();
var tokencontroller=require("../controller/tokencontroller");

router.get('/get',tokencontroller.tokentest);
router.post('/generate',tokencontroller.tokengenerator);

module.exports=router;