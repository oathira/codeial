
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


// module.exports.create = function(req, res) {
//     Post.findById(req.body.post,function(err,post){
//         if(post){
//             Comment.create({
//                 content:req.body.content,
//                 post:req.body.post,
//                 user :req.user._id
//             },function(err,comment){
//                 //handling error;

//                 post.comments.push(comment);
//                 post.save();

//                 res.redirect('/');
//             })
//         }
//     })
// }
// module.exports.create = async function(req, res) {
//     try {
//         const post = await Post.findById(req.body.post).exec();
        
//         if (post) {
//             const comment = await Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             });

//             post.comments.push(comment);
//             await post.save();

//             res.redirect('/');
//         }
//     } catch (err) {
//         // Handle error
//         console.error(err);
//         // Respond with an error message or status code
//         res.status(500).send('An error occurred')
//     }
// };
