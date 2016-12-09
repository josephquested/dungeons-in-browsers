var express = require('express')
var templit = require('templit')
var passport = require('./passport')

var app = express()

app.engine('js', templit)
app.set('view engine', 'js')
app.set('views', `${__dirname}/../views`)

// --- middleware --- //
app.use(express.static(`${__dirname}/../public`))
app.use(require('cookie-parser')())
app.use(require('body-parser').urlencoded({ extended: true }))
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())

// --- routes --- //
app.get('/', (req, res) => res.render('home', { user: req.user } ))
app.post('/login', passport.authenticate('local', { failureRedirect: '/' }), (req, res) => res.redirect('/'))
app.use('/quit', require('./routes/quit'))
app.use('/play', require('./routes/play'))
app.use('/logup', require('./routes/logup'))

module.exports = app