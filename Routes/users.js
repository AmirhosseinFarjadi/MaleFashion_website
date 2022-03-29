const express = require('express');
const User = require('../Models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');



//Login Page
router.get("/login",(req,res) => {
    res.render("./partials/login");
})

//Register Page
router.get("/register",(req,res) => {
    res.render("./partials/register");
})

router.post("/register",(req,res) => {
    const {name, email, password, password2} = req.body;
    
    let errors = [];

    if(!name || !email || !password || !password2){
        errors.push({msg:'All fields Required!'})
    }

    if(password !== password2){
        errors.push({msg: 'Passwords not matched'})
    }

    if(password.length < 6){
        errors.push({msg: 'Passwords should be at least 6 charactres'})
    }

    if(errors.length > 0){
        res.render("./partials/register",{errors, name , email,password, password2});
    }
    else{
        User.findOne({email:email})
        .then(user => {
            if(user){
                errors.push({msg:'This email already exist'});
                res.render("./partials/register",{errors, name , email,password, password2});
            }
            else{
                const newUser = new User({name, email,password});

                bcrypt.genSalt(10,(err,salt) => {
                    if(err) throw err;

                    bcrypt.hash(newUser.password , salt, (err, hash) =>{
                        if(err) throw err;

                        newUser.password = hash;
                        newUser.save()
                        .then(user => {
                            req.flash('success_msg',"شما هم اکنون ثبت نام شده اید.")
                            res.redirect('login');
                        })
                        .catch(err => console.log(err));
                    })
                })              
            }
        }).catch(err => console.log(err))
    }
})

//Login Process
router.post("/login", (req, res, next)=>{
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

//Logout Process

router.get("/logout", (req, res)=>{
    req.logout();
    req.flash('success_msg', "Your are logged out");
    res.redirect("/users/login");
});

module.exports = router;