const Post = require('../models/post')
const comment = require('../models/comment')

module.exports.create = async function (req, res) {
try{
    let post = await Post.create({
        content: req.body.content,
        user: req.user._id
    });

    if(req.xhr){
        return res.status(200).json({
            data:{
                post:post
            },
            message:"post created"
            
        })
    }

        return res.redirect('back');
}
catch(err){
    console.log('Error',err);
}
    
}

module.exports.destroy = async function (req, res) {
    console.log(req.params)
    try {
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id) {
            console.log(req.user)
            console.log(post.user)
            post.remove();

            if(req.xhr){
                return res.status(200).json({
                    data : {
                    post_id: req.params.id
                  },
                  message : "Post deleted"
                });
            }
            await comment.deleteMany({ post: req.params.id })
                return res.redirect('back');
        
        }
        else {
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log('Error', err);
        return;
    }

}