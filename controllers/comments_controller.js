
const Comment = require('../models/comment'); // Make sure to require the correct model
const Post = require('../models/post');

module.exports.create = async function(req, res) {
  try{
    let post = await  Post.findById(req.body.post);
   if (post) {
     let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id
    });
     post.comments.push(comment); // Use the variable to access the post
     post.save();//whenever update the data is saved in database
     req.flash('success','comment added');
     return res.redirect('back');
    }
 }
  catch(err) {
    req.flash('error',err);
      return;
        };
};


module.exports.destroy = async function (req, res) {
    try {
      const comment = await Comment.findById(req.params.id);
  
      if (!comment ) {
        return res.status(404).send('Comment not found');
      }
  
      if (comment .user == req.user.id) {
        let postId = comment.post;
        comment.deleteOne();
        await Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});
        req.flash('success','comment removed');
        return res.redirect('back');
      } else {
        return res.redirect('back');
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
  };
  