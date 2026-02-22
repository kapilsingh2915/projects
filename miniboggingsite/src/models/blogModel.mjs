import mongoose from "mongoose";
const blogSchema= new mongoose.Schema({ 
    title: {type: String, required: [true, 'Title is required.']}, 
    body: {type: String, required: [true, 'Content is required']}, 
    authorId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'author',
        required:[true,'AuthorID is required']
    }, 
    tags: [String], 
    category: {
        type:String,
        required:[true,'Category is required']
    }, 
    subcategory: {
        type:[String],
     },  
    deletedAt: {
        type:Date,
        default:null
    }, 
    isDeleted: {
        type:Boolean,
        default: false
    }, 
    publishedAt: {
        type:Date,
        default:Date.now()
    }, 
    isPublished: {
        type:Boolean, 
        default: false
    }
},{timestamps:true})
const blogModel= mongoose.model('blog',blogSchema);
export default blogModel;