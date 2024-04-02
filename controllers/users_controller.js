const User = require('../models/user')

module.exports.profile = function (req, res) {
    
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
            if(user){
                return res.render('profile', {
                    title: 'User Profile',
                    user: user
            })
            }
        })
    }
    else{
        return res.render('/users/sign-in')
    }

    }


// render the sign up page
module.exports.signUp = function (req, res) {
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    });
}


// render the sign in page
module.exports.signIn = function (req, res) {
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    });
}

module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }
    console.log(req.body);

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log('erroe')
            return;
        }
        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) {
                    console.log(err);
                    return;
                }
                return res.redirect('/users/sign-in');

            })
        }
        else {
            return res.redirect('back');
        }



    })
}

module.exports.createSession = function (req, res) {
    // steps to auth
    //  find the user
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log('error in finding user');
            return;
        }
        // handle user found
        if (user) {
            // handle password which don't match
            if (user.password != req.body.password) {
                return res.redirect('back');
            }
            // handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');

        }
        // handle user not found
        else {
            return res.redirect('back');
        }

    })



}