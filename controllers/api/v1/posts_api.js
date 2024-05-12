const Post = require('../../../models/post')
const Comment = require('../../../models/comment')


module.exports.index = async function(req,res){


        let posts= await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate :{
                path:'user'
            }
        });

    return res.status(200).json({
        message: "list of pst",
        posts : posts
    })
}

module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){
            post.remove();

            await Comment.deleteMany ({post: req.params.id});

 return res.status(200).json({
    message: "post and associated comments deleted successfully"
 });


            // if (req.xhr){
            //     return res.status(200).json({
            //         data: {
            //             post_id: req.params.id
            //         },
            //         message: "Post deleted"
            //     });
            // }


        //     return res.redirect('back');
        }else{ 
            return res.json(401,{
                message: "unauthorized deletion"
            })
        }

    }catch(err){
       console.log('******',err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
    
}