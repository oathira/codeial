
const Post = require('../models/post'); 
const Comment = require('../models/comment');

module.exports.create = async function(req, res) {
  try {
     await Post.create({
      content: req.body.content,
      user: req.user._id
    });
    
    return res.redirect('back');
  } catch (err) {
    console.error('Error in creating post:', err);
    return ;
  }
}

module.exports.destroy = async function (req, res) {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).send('Post not found');
    }

    if (post.user == req.user.id) {
      post.deleteOne();
      await Comment.deleteMany({ post: req.params.id });
      return res.redirect('back');
    } else {
      return res.redirect('back');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
};
