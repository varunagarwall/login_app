const User = require('../models/user');
const Post = require('../models/post');


module.exports.home = async function (req, res) {
    // Post.find({}, function (err, posts) {
    //     
    // });

    // populate the user of each post
    try{
        let posts= await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate :{
                path:'user'
            }
        });
    
         let users = await  User.find({});
    
                return res.render('home', {
                    title: 'home',
                     posts: posts,
                     all_users:users
                });
    }
    catch(err){
console.log('Error',err);
return;
    }

     
}


