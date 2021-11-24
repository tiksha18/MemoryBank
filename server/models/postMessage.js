import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title : String,
    message : String,
    name : String,  // this is the name of the person who is logged in
    creator : String,
    tags : [String],
    selectedFile : String,   // we gonna convert selected image file into string using react-file-base64
    likes : {
        type : [String],
        default : []
    },
    createdAt : {
        type : Date,
        default : new Date()
    }
});

// converting Schema to Model
const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;