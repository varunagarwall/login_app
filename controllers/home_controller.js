const User = require('../models/user');

module.exports.home= function(req,res){
    return res.render('home', {
        title: 'home',
        user: User
    });
}
