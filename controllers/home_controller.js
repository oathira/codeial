const Post = require('../models/post');
const User = require('../models/user');

  // console.log(req.cookies);//console cookies in home page cookie are coming in request
  // res.cookie('slf',10);//setting cookie with key slf and value 10
 

  module.exports.home = async function (req, res) {
    try {
      // Populate the user of each post and their comments' users
      const posts = await Post.find({})
      .sort('-createdAt')
        .populate('user')
        .populate({
          path: 'comments',
          populate: {
            path: 'user'
          }
        });
   
  
      // Find all users
      const users = await User.find({});
  
      return res.render('home', {
        title: 'codeial | Home',
        posts: posts,
        all_users: users
      });
    } catch (err) {
      console.error('Error in creating post:', err);
      return ;
    }
  };
  
 