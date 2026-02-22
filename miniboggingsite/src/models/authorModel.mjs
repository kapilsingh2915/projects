import mongoose from "mongoose";
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const authorSchema = new mongoose.Schema({
    fname: { type: String, required: [true, 'First name is required.']  },
    lname: { type: String, required: [true, 'Last name is required.']  },
    title: {
        type: String,
        required: [true, 'title is required.'] ,
        enum: {
            values: ['Mr', 'Mrs', 'Miss'],
            message: 'Only [Mr, Mrs, Miss] are allowed'
        }
    },
    email: {
        type: String,
        required: [true, 'Email address is required.'],
        unique: true, // Ensures unique emails in the collection
        lowercase: true, // Converts email to lowercase before saving
        trim: true, // Removes whitespace from both ends
        match: [emailRegex, 'Please fill a valid email address.']
    },
    password: {  
        type: String,
        required: [true, 'Password is required.'] 
    }
},{timestamps:true})
const authorModel= mongoose.model('author',authorSchema);
export default authorModel;