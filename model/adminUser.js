const moongose = require('mongoose')
const Userschema = new moongose.Schema({
    email: {
        type: String,
        require: true,

    },
    password: {
        type: String,
        require: true
    }
})

const Admin = moongose.model('adminlogin', Userschema)


module.exports = Admin