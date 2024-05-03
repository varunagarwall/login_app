const User = require('../models/user');
const Post = require('../models/post');


module.exports.home = function (req, res) {
    // Post.find({}, function (err, posts) {
    //     
    // });

    // populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate :{
            path:'user'
        }
    })
    .exec(function(err,posts){ 
        User.find({},function(err,user){
            return res.render('home', {
                title: 'home',
                 posts: posts,
                 all_users:user
            });
        })

    })
}


