
const Post = require('../models/post'); 
const Comment = require('../models/comment');

module.exports.create = async function(req, res) {
  try {
     let post = await Post.create({
      content: req.body.content,
      user: req.user._id
    });
     
    if(req.xhr){
      return res.status(200).json({
        post:post,
        message : 'post created!'
      });
    }

    req.flash('success','post published');
    return res.redirect('back');
  } catch (err) {
    req.flash('error', err);
    return res.redirect('back');
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
      req.flash('success','post and associated comments removed');
      return res.redirect('back');
    } else {
      req.flash('error',' you cannot remove post');
      return res.redirect('back');
    }
  } catch (err) {
    req.flash('error',err);
    return res.status(500).send('Internal Server Error');
  }
};
