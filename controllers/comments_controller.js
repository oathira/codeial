
const Comment = require('../models/comment'); // Make sure to require the correct model
const Post = require('../models/post');

module.exports.create = function(req, res) {
    console.log('dacCFH'+ req);
    let foundPost; // Declare a variable to hold the found post

    Post.findById(req.body.post)
        .then(post => {
            if (!post) {
                throw new Error("Post not found");
            }

            foundPost = post; // Assign the post to the variable

            return Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
        })
        .then(comment => {
            foundPost.comments.push(comment); // Use the variable to access the post
            return foundPost.save();//whenever update the data is saved in database
        })
        .then(() => {
            res.redirect('/');
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('An error occurred');
        });
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
        return res.redirect('back');
      } else {
        return res.redirect('back');
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
  };
  