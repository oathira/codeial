const mongoose = require('mongoose');

const postSchema = new monogoose.Schema({
    content:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

const Post = mongoose.model('Post',postSchema);

module.exports = Post;