const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId
    },
    //this defines the id of the likable object
    likable:{
        type:mongoose.Schema.ObjectId,
        required:true,
        refPath:'onModel'
    },
    //this field is used for defining the type of the liked object since this is a dynamic reference
    onModel:{
        type: String,
        required:true,
        enum :['post','comment']
    }
},{
    timestamps:true
});

const Like = mongoose.model('Like',likeSchema);

module.exports = Like;