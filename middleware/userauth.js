const User=require('../model/User')
const auth = async (req, res, next) => {
    if (!req.session.loggedIn) {
        res.redirect("/login")
    } else {
       const id=req.session.user
       const user=await User.findOne({_id:id})
       if(!user){
          delete req.session.loggedIn
          delete req.session.user
          res.redirect('/login')
       }else{
        next()
       }
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