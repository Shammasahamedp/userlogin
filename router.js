var express = require('express')
var router = express.Router();
const userauth = require('./middleware/userauth.js')
const usercontroller = require('./controller/usercontroller.js')
router.get('/login',userauth.redirecthome, usercontroller.getlogin)
router.get('/signup',userauth.redirecthome, usercontroller.getsignup)
router.post('/signup', usercontroller.usersignup)
router.post('/login', usercontroller.userlogin)
router.get('/home', userauth.auth, usercontroller.gethome)
router.get('/', userauth.auth, usercontroller.gethome)
router.get('/logout', usercontroller.userlogout)
router.get('/home/edit', usercontroller.gethomeedit)
router.post('/home/edit', usercontroller.homeedit)
module.exports = router;


