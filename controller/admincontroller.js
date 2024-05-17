const Admin = require('../model/adminUser.js')
const bcrypt = require('bcrypt')
const User = require('../model/User.js')
const getlogin = (req, res) => {
    res.render('admin/admin', { errorMessage: '' })
}
const userlogin = async (req, res) => {
    const { email, password } = req.body
    const isAdmin = await Admin.findOne({ email: email, password: password })
    if (isAdmin) {
        req.session.admin = {
            email: isAdmin.email,
            isAdmin: true
        }
        res.redirect('/admin/dashboard')
    } else {
        res.render('admin/admin', { errorMessage: 'invalid username or password' })
    }
}
const getdashboard = async (req, res) => {
    const users = await User.find()
    res.render('admin/admindashboard', { users: users, searchterm: '' })


}
const deletedata = async (req, res) => {
    const { userId } = req.body
    await User.findByIdAndDelete(userId)
    delete req.session.user
    delete req.session.loggedIn
    res.redirect('/admin/login')
}
const getedit = async (req, res) => {
    const userId = req.query.userId
    const user = await User.findById(userId)
    res.render('admin/adminedit', { user: user })

}
const updatedata = async (req, res) => {
    const userId = req.body.userId
    const updatedata = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    }
    await User.findByIdAndUpdate(userId, updatedata, { new: true, runValidators: true })
    res.redirect('/admin/dashboard')
}
const getadduser = (req, res) => {
    res.render('admin/adminadduser')

}
const adduser = async (req, res) => {
    const { name, email, password, phone } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    await User.create({
        name: name,
        email: email,
        password: hashedPassword,
        phone: phone
    })
    res.redirect('/admin/dashboard')
}
const searchdata = async (req, res) => {
    const searchTerm = req.query.searchTerm
    const users = await User.find({ name: { $regex: searchTerm, $options: 'i' } })
    res.render('admin/admindashboard', { users: users, searchterm: searchTerm })
}
const logout = (req, res) => {
    delete req.session.admin
    res.redirect('/admin/login')
}
module.exports = {
    getlogin,
    userlogin,
    getdashboard,
    deletedata,
    getedit,
    updatedata,
    getadduser,
    adduser,
    searchdata,
    logout,
}