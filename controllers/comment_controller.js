const Comment = require('../models/comment');
const Post = require('../models/post')

module.exports.create = async function (req, res) {
    try{
        let post = await Post.findById(req.body.post)

        if (post) {
            Comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.post
            });

                // console.log(err)
                post.comments.push(comment);
                post.save();
                res.redirect('/');
            
        }
    }
    catch(err){
        console.log('Eroor',err)
    }
  
 

}

module.exports.destroy = async function (req, res) {
    let comment = await Comment.findById(req.params.id);
    
        if (comment.user = req.user.id) {
            let postId = comment.post;
            comment.remove(); 
            let post = await    Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } })
                return res.redirect('/users/profile');
           
        } else {
            return res.redirect('back');
        }



}