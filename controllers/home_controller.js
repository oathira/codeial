const Post = require('../models/post');


  // console.log(req.cookies);//console cookies in home page cookie are coming in request
  // res.cookie('slf',10);//setting cookie with key slf and value 10
 

module.exports.home = async function(req, res) {
  try {
    //populate the user of each post
    const posts = await Post.find({})
    . populate('user')
    .populate({
      path: 'comments',
      populate:{
        path:'user'
      }
    })
    .exec();//to populate the name because inside post only userid is there use mongoose populate
      return res.render('home',{
        title:'codeial | Home',
        posts :posts
      });
  }
 
    // return res.redirect('back');
   catch (err) {
    console.error('Error in creating post:', err);
    return res.status(500).send('Internal Server Error');
  }
}

 