const User = require('../model/User.js')
const bcrypt = require('bcrypt')

const gethome = (req, res) => {
    if (req.query) {
        const msg=req.query.updatemsg
        res.render('home', { success: msg })
    } else {
        res.render('home')
    }
}
const getlogin = (req, res) => {
    if (req.query) {
        res.render('base', { logout: req.query.logoutmsg })
    }
    else {
        res.render('base')
    }
}
const userlogin = async (req, res) => {

    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password)
            if (isMatch) {
                req.session.user = user._id
                req.session.loggedIn = true;
                res.redirect('/home')
            } else {
                res.render('base', { err: 'Invalid email or password' })

            }
        } else {
            res.render('base', { err: 'Invalid email or password' })
        }
    } catch (err) {
        console.log("error occured")
        res.render('base', { err: 'an error occured' })
    }
}
const getsignup = (req, res) => {
    res.render('signup')
}
const usersignup = async (req, res) => {
    const { name, email, phone, password } = req.body
    const isEmailexists = await User.findOne({ email: email })
    if (!isEmailexists) {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name: name,
            email: email,
            phone: phone,
            password: hashedPassword
        })
        res.render('base', { signup: 'signup successfully' })

    } else {
        res.render('base', { exists: 'email already exists' })
    }
}
const homeedit = async (req, res) => {
    if (req.session.loggedIn) {
        const { name, email, phone } = req.body
        const userId = req.session.user
        const user = await User.findOne({ _id: userId })
        const emailexists = await User.findOne({ email: email, _id: { $ne: userId } })
        if (emailexists) {

            res.render('homeedit', { user, exists: 'email already exists' })
        }
        else {
            user.name = name,
                user.email = email,
                user.phone = phone
            await user.save()
            updatemsg = 'updated successfully'
            res.redirect(`/home?updated=${updatemsg}`)
        }
    } else {
        res.redirect('/')
    }
}
const gethomeedit = async (req, res) => {
    if (req.session.loggedIn) {
        const id = req.session.user
        const user = await User.findOne({ _id: id })
        res.render('homeedit', { user })
    } else {
        res.redirect('/')
    }
}
const userlogout = (req, res) => {
    delete req.session.user
    delete req.session.loggedIn
    let msg = 'logout successfully'
    res.redirect(`login?logoutmsg=${msg}`)
}
module.exports = {
    gethome,
    getlogin,
    userlogin,
    getsignup,
    usersignup,
    gethomeedit,
    homeedit,
    userlogout
}