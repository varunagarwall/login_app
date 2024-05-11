const Comment = require('../models/comment');
const Post = require('../models/post')

module.exports.create = async function(req, res){

    try{
        let post = await Post.findById(req.body.post);

        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();

         
            if (req.xhr){
                // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
    
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Comment created!"
                });
            }

            res.redirect('/');
        }
    }catch(err){
        return;
    }
    
}

module.exports.destroy = async function (req, res) {
    try{
        console.log('hello reached here')
    let comment = await Comment.findById(req.params.id);
    
        if (comment.user = req.user.id) {
            let postId = comment.post;
            comment.remove(); 
            let post = await    Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } })
            return res.redirect('back');

        }else{
            return res.redirect('back');
        
        }

    }
    catch(err){
        console.log('Eroor',err)
    }
}