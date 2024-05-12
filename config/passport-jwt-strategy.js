const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;

const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

let ops ={
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
     secretOrKey: 'codeial',
}

passport.use(new JWTstrategy(ops, function(jwtPayLoad,done){
 User.findById(jwtPayLoad._id,(err,user)=>{
    if(err){
        console.log()
    }
    if(user){
        return done(null,user);
    }else{
        return done(null,false);
    }
})
}))

module.exports = passport;