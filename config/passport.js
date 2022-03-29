const localSterategy = require('passport-local').Strategy
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


//Load User Model
const User = require('../Models/User');
module.exports = function(passport){
    passport.use(
        new localSterategy({usernameField: 'email'}, (email, password, done)=>{
            //match user
  
            User.findOne({email:email})
            .then(user=>{
                if (!user){
                    return done(null, false, {message:'That email is not regestered'})
                }
                
                //Match Password
                bcrypt.compare(password, user.password, (err, isMatch)=>{
                    if(err)
                        throw(err);
                    
                    if(isMatch){
                        return done(null, user);
                    }  
                    return done(null, false, {message:'password incorrect'})
  
                })
            }).catch(err=>console.log(err));
        })
    );
    passport.serializeUser((user, done)=> {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done)=> {
        User.findById(id, (err, user)=> {
          done(err, user);
        });
      });
}