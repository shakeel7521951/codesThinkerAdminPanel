const mongoose = require("mongoose");

const blogs = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
        minlength: 3 
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    blogImage: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    likes:{
        type:Number,
        default:0
    },
    comments:[
        {
            user:{
                type:String,
                required:true
            },
            comment:{
                type:String,
                required:true
            },
            date:{
                type:Date,
                default:Date.now()
            }
        }
    ]
},{timestamps:true});

const BlogsSchema = mongoose.model('Blog', blogs);
module.exports = BlogsSchema;
