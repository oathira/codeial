const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Reference to the User model
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post' // Reference to the Post model
    },
    likes : [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Like'
    }]
}, {
    timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;

// const commentSchema = mongoose.Schema({
//     content:{
//         type:String,
//         required:true
//     },
//     //comment belongs to user
//     user:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref : 'User'
//     },
//     post:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref : 'Post'
//     }
// },{
//     timestamps :true
// });

// const Comment = mongoose.model('Comment',commentSchema);

// module.exports = Comment;