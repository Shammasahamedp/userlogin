
const auth = (req, res, next) => {
    if (!req.session.loggedIn) {
        res.redirect("/login")
    } else {
        next()
    }
}
const redirecthome = (req, res, next) => {
    if (req.session.loggedIn) {
        res.redirect('/home')
    }
    else{
        next()
    }
}
module.exports = {
    auth,
    redirecthome,
}