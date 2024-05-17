const express = require('express')
const adminrouter = express.Router()
const adminauth = require('./middleware/adminauth.js')
const admincontroller = require('./controller/admincontroller.js')
adminrouter.get('/', adminauth.auth , admincontroller.getdashboard)
adminrouter.get('/login',adminauth.isloggin, admincontroller.getlogin)
adminrouter.post('/login', admincontroller.userlogin)
adminrouter.get('/dashboard',adminauth.auth, admincontroller.getdashboard)
adminrouter.post('/logout', admincontroller.logout)
adminrouter.post('/delete', admincontroller.deletedata)
adminrouter.get('/edit', admincontroller.getedit)
adminrouter.post('/update', admincontroller.updatedata)
adminrouter.get('/adduser', admincontroller.getadduser)
adminrouter.post('/adduser', admincontroller.adduser)
adminrouter.get('/search', admincontroller.searchdata)
module.exports = adminrouter