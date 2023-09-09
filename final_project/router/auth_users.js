const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();
const bodyParser = require("body-parser");
const session = require('express-session')

regd_users.use(bodyParser.urlencoded({ extended: false }))
regd_users.use(bodyParser.json())
let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
const user = users.find((user) => user.username === username && user.password === password);
    if(!user) return false;
  return true;
}



regd_users.use(session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const {username,password} = req.body;
  
         // Check if username or password is missing
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  // Find the user by username and password (you can use a more secure authentication method)
  const user = users.find((user) => user.username === username && user.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  // Generate a JWT token with user information
  let accessToken = jwt.sign({
    data: username
  }, 'access', { expiresIn: 60 * 60 });

  

    req.session.authorization = {
        accessToken
    }

  // Send the token as a response
  return res.status(200).json({ message:"User logged in successfully"});
  
});

// Add a book review
// Add or modify a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const  username  = req.body.username; 
    const isbn = req.params.isbn;
    const review = req.body.review;
  
    if (!review) {
      return res.status(400).json({ message: "Review is required." });
    }

    console.log(username)
  
    // Find the book by ISBN and user by username
    book=null;
    for(i='1';i<'11';i++){
        if (books[i].isbn===isbn){
          book = books[i]
        }
    }
    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }
  
    // Find the user's existing review for the book (if any)
    const userReviewIndex = book['reviews'].findIndex((r) => r.username === username);
    let newr =0 
    if (userReviewIndex === -1) {
      // User hasn't reviewed this book before, add a new review
      book['reviews'].push({ username, review });
      newr=1
    } else {
      // User has reviewed this book before, update the existing review
      console.log(book['reviews'][userReviewIndex].review)
      book['reviews'][userReviewIndex].review = review;
      console.log(book['reviews'][userReviewIndex].review)
    }

    if(newr) return res.status(200).json({ message: "Review added successfully." ,updated_reviews: book['reviews']});
  
    return res.status(200).json({ message: "Review modified successfully.",updated_reviews: book['reviews'] });
  });



regd_users.delete("/auth/review/:isbn", (req, res) => {
    const  username  = req.body.username; 
    const isbn = req.params.isbn;
  
   
    console.log(username)
  
    // Find the book by ISBN and user by username
    book=null;
    for(i='1';i<'11';i++){
        if (books[i].isbn===isbn){
          book = books[i]
        }
    }
    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }
  
    // Find the user's existing review for the book (if any)
    const userReviewIndex = book['reviews'].findIndex((r) => r.username === username);
    let newr =0 
    if (userReviewIndex === -1) {
      // User hasn't reviewed this book before, add a new review
       return res.status(300).json({message:"user not found"})
    } else {
        delete book['reviews'][userReviewIndex].username
        delete book['reviews'][userReviewIndex].review
    }
    

    
  
    return res.status(200).json({ message: "Review deleted successfully." ,updated_reviews: book['reviews']});
});


  

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
