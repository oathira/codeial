const Post = require('../../../models/post');
const Comment= require('../../../models/comment');

module.exports.index = async function(req,res){
    
    const posts = await Post.find({})
    .sort('-createdAt')
      .populate('user')
      .populate({
        path: 'comments',
        populate: {
          path: 'user'
        }
      });

    return res.json(200,{
        posts:posts,
        message : 'List of posts'
      });
}


module.exports.destroy = async function (req, res) {
    try {
      const post = await Post.findById(req.params.id);
  
        if (post.user == req.user.id) {
        post.deleteOne();
       
        await Comment.deleteMany({ post: req.params.id });
       
        return res.json(200,{
            message:"post and associated comments deleted successfully"
        });}else{
          return res.json(401,{
            message:"You cannot delete the post"
        });
        }
  
    } catch (err) {
      console.log('*********',err);
      return res.json(500,{
       message:"Internal server error"
      });
    }
}
  