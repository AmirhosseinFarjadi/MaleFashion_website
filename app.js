const path = require('path');
fs = require('fs');

const express = require('express')
const hbs = require('express-handlebars')
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const app = express()
const port = process.env.PORT || 3000
var bodyParser= require("body-parser");
//Passport Config
require ('./config/passport')(passport);

//static Folder
app.use(express.static(__dirname + "/public"));

const db = require('./config/keys').MongoURI;
mongoose.connect(db, {useNewUrlParser: true,useUnifiedTopology: true})
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({extended:true}));
app.set('views',path.join(__dirname,'views')); 

app.engine('hbs',hbs({
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir:__dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine','hbs');
app.use(methodOverride('_method'));
 
//session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}))

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());


//Global val
app.use((req,res, next)=>{
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
})

app.use("/",require("./Routes/index"));
app.use("/contact",require("./Routes/contact"));
app.use("/blog",require("./Routes/blog"));
app.use("/more",require("./Routes/more"));
app.use("/shopping",require("./Routes/shopping"));
app.use("/product",require("./Routes/product"));
app.use("/users",require("./Routes/users"));
app.use("/authenticateForm",require("./Routes/authenticateForm"));



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})