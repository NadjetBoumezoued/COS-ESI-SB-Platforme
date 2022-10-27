const express= require('express');
const authController=require ('../controllers/auth'); 
const router=express.Router();
var db=require('../app');
router.post('/add-article',authController.register);//we create
router.post('/trans',authController.trans);
router.get ('/trans',authController.trans);//we create
router.post('/email',authController.email);
router.post('/billan',authController.billan); 
router.post ('/billan_mois',authController.billan_mois); 
router.post ('/registerinarti',authController.registerinarti); 
router.post ('/partagermontant',authController.partagermontant); 
router.post('/register1',authController.register1);
module.exports = router;
