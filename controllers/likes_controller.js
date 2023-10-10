const Like = require('../models/like');
const Comment = require('../models/comment');
const Post = require('../models/post');


module.exports.toggleLike = async function(req,res){
try{
    //likes/toggle/?id=abcdef&type=Post
    let likeable;
    let deleted = false;

    if(req.query.type == 'Post'){
              likeable = await Post.findById(req.query.id).populate('likes');
    }else{
        likeable = await Comment.findById(req.query.id).populate('likes');
    }
        

    //check if already like is there
    let existingLike =  await Like.findOne({
        likeable : req.query.id,
        onModel : req.query.type,
        user :req.user._id
    });

    //if already like there delte it or make a new like
    if(existingLike){
        likeable.likes.pull(existingLike._id);
        likeable.save();
        existingLike.remove();
        deleted = true;
     }else{
        let newLike = await Like.create({
            user :req.user._id,
            likeable : req.query.id,
            onModel : req.query.type,

        });
        likeable.likes.push(newLike._id);
        likeable.save();
     }
     return res.json(200,{
        message :"request succesful",
        data :{
            deleted :deleted
        }
     });

}catch (err) {
    console.error('Error in Liking:', err);
    req.flash('error', err.message);
    return res.json(500,{
        message:'Internal server error'
    })
}
};