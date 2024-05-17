
const auth = (req, res,next) => {
    if(!req.session.admin){
        res.redirect('/admin/login')
    }else{
        next()
    }
}
const isloggin=(req,res,next)=>{
    if(req.session.admin){
        res.redirect('/admin/dashboard')
    }else{
        next()
    }
}
module.exports = {
    auth,
    isloggin
}