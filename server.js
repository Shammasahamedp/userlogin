const express = require('express')
const path = require('path')
const bodyparser = require('body-parser')
const session = require('express-session')
const { v4: uuidv4 } = require('uuid')
const router = require('./router.js')
const adminrouter = require('./adminrouter.js')
const nocache = require('nocache')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/usersdatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("mongodb connected successfully")
}).catch((err) => {
    console.error('mongo connection error', err)
})
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    if (err instanceof mongoose.Error.CastError) {
        return res.status(400).send('Invalid user ID')
    }
    res.status(500).send('Internal Server Error')
    next()
}
const port = process.env.PORT || 3000
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.set("view engine", 'ejs')
app.use(errorHandler)
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/assests', express.static(path.join(__dirname, 'public/assests')))
app.use(nocache())

app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}))

app.use('/', router)
app.use('/admin', adminrouter)

app.listen(port, () => { console.log("Listening to the server on http://localhost:3000") })
