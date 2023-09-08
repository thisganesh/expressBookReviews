const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const bodyParser = require("body-parser");

public_users.use(bodyParser.json())


public_users.post("/register", (req,res) => {
  //Write your code here
  const { username, password } = req.body;

  // Check if username or password is missing
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  // Check if the username already exists
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: "Username already exists." });
  }

  // If username is unique, create a new user
  const newUser = { username, password };
  users.push(newUser);


    console.log(users)
   return    res.status(200).json({message:"user registered successfully"});
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
  return res.status(300).json({message: "book not found"});
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

  title = req.params.title;
  result = [];
  f=0;
  for(i='1';i<'11';i++){
    if (books[i].title===title){
        result.push([i,books[i]])
        f=1;
    }
    }
   if(f==1){
    return res.status(200).json({message: "title found, these are list of book details",
    books:result});
   }

    
  return res.status(300).json({message: "title not found"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  isbn = req.params.isbn;
    
  for(i='1';i<'11';i++){
      if (books[i].isbn===isbn){
        return res.status(200).json({message: "book found",book_review: books[i]['reviews']});;
      }
  }
 return res.status(200).json({message: "book not found"});
  
});

module.exports.general = public_users;
