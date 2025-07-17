const express =require("express");
const router=express.Router();
const Book=require('../Models/book');
const addProfile=require('../Models/profile')
const {auth,authPage}=require("../middleware/auth");
const jwt=require("jsonwebtoken");
const multer=require('multer');
require('dotenv').config();
const SecretKey=process.env.SECRET_KEY;


var storage=multer.diskStorage({
    destination:(req,file,cb)=> cb(null,'uploads/'),
    filename: (req,file,cb)=>cb(null,Date.now()+"-"+file.originalname)
    });

//middleware
var upload=multer({storage});

//Insert book in database
router.post('/Add', upload.single("image"), async (req, res) => {
    const book = new Book({
        bookname: req.body.bookname,
        authorname: req.body.authorname,
        isbn:req.body.isbn,
        price: req.body.price,
        summary: req.body.summary,
        image: req.file ? req.file.filename : null,
        coverImageUrl:req.body.coverImageUrl,
        mark: false,
        issuedCount: 0 
    });

    try {
        await book.save();
        res.redirect("/Add"); // or res.send("Book added successfully");
    } catch (error) {
        console.log("Error while saving book:", error);
        res.status(500).send("Error saving book.");
    }
});  

//get all data
router.get("/",async(req,res)=>{
    let data=await Book.find();
    const loggedIn=req.cookies.loggedIn || 'false';
    const isAdmin=req.cookies.isAdmin || 'false';
    const userName=req.cookies.userName || 'Wellcome';
    res.render('index',{
        title:'Home page',
        books:data,
        loggedIn,
        isAdmin,
        userName
    });
})
// show book which borrow
router.get("/Profile",auth,async(req,res)=>{
    const loggedIn=req.cookies.loggedIn || 'false';
    const isAdmin=req.cookies.isAdmin || 'false';
    const userName=req.cookies.userName || 'User';
    const token=req.cookies.token;
    if(!token) return req.redirect("/login");

    let user;
    try{
        user= jwt.verify(token,SecretKey);
    } catch(err){
        console.log("Error in /profile: " ,err.message)
        return res.redirect("/login");
    }
    
    let data=await addProfile.find({userId:user.id});
    res.render('user_profile',{
        title:'Profile',
        addBook:data,
        loggedIn,
        isAdmin,
        userName
    });
})

//borrow book
router.get("/Profile/:id",async(req,res)=>{
    let result=await Book.findOne({_id:req.params.id});
    const token=req.cookies.token;
    if(!token)return res.redirect("/login");
    let user;
    try{
        user=jwt.verify(token,SecretKey);
    }catch(err){
        console.log("Error in /profile/:id: ",err.message)
    }
 
    
    const borrow=new addProfile({
        bookname:result.bookname,
        authorname:result.authorname,
        price:result.price,
        summary:result.summary,
        image:result.image,
        bookId:req.params.id,
        userId:user.id,
       
     
    });
   let data=await Book.updateOne(
        { _id: req.params.id },
        { $set: {  mark: true,
            borrowedBy: user.id }, 
        $inc: { issuedCount: 1 } }
      );
    await borrow.save();
    res.redirect("/") ;
})
//return book
router.get("/Home/:id",async(req,res)=>{
    const data=await addProfile.findOne({_id:req.params.id});
    await addProfile.deleteOne({_id:req.params.id})
    let result=await Book.updateOne(
        { _id: data.bookId },
        { mark: false }
      );
    res.redirect("/Profile");
})
//add book details
router.get("/Add",authPage(["admin"]),(req,res)=>{
    const loggedIn=req.cookies.loggedIn || 'false';
    const isAdmin=req.cookies.isAdmin || 'false';
    const userName=req.cookies.userName || 'User';
    res.render("add_book",{title:"Add Book",
                            loggedIn,
                            isAdmin,
                            userName})
})

//delete books from book database
router.post("/Delete/:id", authPage(["admin"]), async (req, res) => {
    try {
        const bookId = req.params.id;
        await Book.deleteOne({ _id: bookId });
        res.redirect("/");
    } catch (error) {
        console.log("Error while deleting book:", error);
        res.status(500).send("Error deleting book.");
    }
});
//Sort 
router.get("/sort/:type", async (req, res) => {
  const { type } = req.params;
  let sortBy = {};

  if (type === "mostIssued") sortBy = { issuedCount: -1 };
  else if (type === "leastIssued") sortBy = { issuedCount: 1 };
  else if (type === "author") sortBy = { authorname: 1 };
  else sortBy = {}; 

  const data = await Book.find().sort(sortBy);
  const loggedIn = req.cookies.loggedIn || "false";
  const isAdmin = req.cookies.isAdmin || "false";
  const userName = req.cookies.userName || "Welcome";

  res.render("index", {
    title: "Home page",
    books: data,
    loggedIn,
    isAdmin,
    userName,
  });
});

//Search 
router.get("/search", async (req, res) => {
    const q = req.query.q;
    const regex = new RegExp(q, "i"); 
    const data = await Book.find({
        $or: [{ bookname: regex }, { authorname: regex }]
    });

    const loggedIn = req.cookies.loggedIn || 'false';
    const isAdmin = req.cookies.isAdmin || 'false';
    const userName = req.cookies.userName || 'Welcome';

    res.render("index", {
        title: "Search Results",
        books: data,
        loggedIn,
        isAdmin,
        userName
    });
});

module.exports = router;