const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  bookJson = JSON.stringify(books)
  return res.status(200).json({message: "These are the list of books",books:bookJson});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
    isbn = req.params.isbn;
    
    for(i='1';i<'11';i++){
        if (books[i].isbn===isbn){
          return res.status(200).json({message: "book found",bookDetails : books[i]});;
        }
    }
  return res.status(200).json({message: "book not found"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  author = req.params.author;
  result = [];
  f=0;
  for(i='1';i<'11';i++){
    if (books[i].author===author){
        result.push([i,books[i]])
        f=1;
    }
    }
   if(f==1){
    return res.status(200).json({message: "author found, these are list of book details",
    books:result});
   }

   return res.status(300).json({message: "author not found"});
  
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
