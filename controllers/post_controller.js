const Post = require('../models/post')
const comment = require('../models/comment')

module.exports.create = function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function(err, post){
        if(err){console.log('error in creating a post'); return;}
        return res.redirect('back');
    });
}

module.exports.destroy = function(req,res){
    console.log(req.params)
    Post.findById(req.params.id,function(err,post){
        if(post.user==req.user.id){
            console.log(req.user.id)
            console.log(post.user)

            post.remove();

            comment.deleteMany({post:req.params.id},function(err){
                res.redirect('/users/profile');
                        } );
        }
        else{
            return res.redirect('back');
        }
    })
}