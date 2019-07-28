const express = require('express')
const app = express()
const port = 7079
const path = require('path')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const session = require('express-session')
const Mstore = require('connect-mongo')(session)
const multer = require('multer')
const auth = require('./auth/auth');

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
mongoose.connect('mongodb://admin:123456d@ds139949.mlab.com:39949/chocktawee_db', { useNewUrlParser: true })
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    store:new Mstore({mongooseConnection: mongoose.connection})
}));

app.use((req,res,next)=>{;
    res.locals.sess = req.session.login;
    next();
})

app.get('/home', auth.checkLogin, (req, res) => {   
    res.render('page/home') 
})

app.get('/logout', (req, res) => {
    req.session.login = undefined
    res.redirect('/');
})


app.use('/', require('./routes/loginRoute'))
app.use('/report',auth.checkLogin, require('./routes/reportRoute'))
app.use('/customer',auth.checkLogin, require('./routes/customerRoute'))
app.use('/user',auth.checkLogin, require('./routes/userRoute'))
app.use('/buy',auth.checkLogin, require('./routes/buyRoute'))
app.use('/sell',auth.checkLogin, require('./routes/sellRoute'))
app.use('/repair',auth.checkLogin, require('./routes/repairRoute'))
app.use('/renew',auth.checkLogin, require('./routes/renewRoute'))
app.use('/stock',auth.checkLogin, require('./routes/stockRoute'))
app.listen(port, () => { console.log(`running at port : ${port}`) });