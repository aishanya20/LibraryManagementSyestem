const mongoose=require('mongoose');
const { required } = require('nodemon/lib/config');
const bookSchema=new mongoose.Schema({
    bookname:{
        type:String,
        required:true,
    },
    authorname:{
        type:String,
        required:true
    },
    isbn:{
        type:String,
        required:true
    },
    price:{
    type:String,
    required:true
    },
    summary:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    coverImageUrl:{
        type:String,
        required:true
    },
    created:{
        type:String,
        required:true,
        default:Date.now
    },
    mark:{
        type:Boolean,
        required:true
    },
    issuedCount:{
        type:Number,
        default:0
    },
    borrowedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    borrowDate: {
      type: Date,
      default: Date.now
    }
})
module.exports=mongoose.model("books",bookSchema);