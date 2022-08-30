import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import db from './database.js'
import User from './models/user.js';
import usersRoutes from './routes/users.js'
import sessions from 'express-session'
import cookieParser from 'cookie-parser'

  // test db
  db.authenticate()
.then(() => console.log('Database Connected'))
.catch(err => console.log("error : " + err));

console.log("init")

const app = express();

// session
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir69",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

app.use(bodyParser.json({limit:"20mb", extended:true}))
app.use(bodyParser.urlencoded({limit:"20mb", extended:true}))

/*app.use(function(req, res, next){
    res.set('Access-Control-Allow-Origin', '*');
    res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})*/

app.use(cookieParser());


app.use(cors());
app.use('/users', usersRoutes);

// set a cookie
app.use(function (req, res, next) {
  // check if client sent cookie
  var cookie = req.cookies.cookieName;
  if (cookie === undefined) {
    // no: set a new cookie
    var randomNumber=Math.random().toString();
    randomNumber=randomNumber.substring(2,randomNumber.length);
    res.cookie('cookieName',randomNumber, { maxAge: 900000, httpOnly: true });
    console.log('cookie created successfully');
  } else {
    // yes, cookie was already present 
    console.log('cookie exists', cookie);
  } 
  next(); // <-- important!
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
