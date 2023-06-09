const express = require("express");
var bodyParser = require("body-parser");

const database = require("./database");
const req = require("express/lib/request");

const booky = express();
booky.use(bodyParser.urlencoded({extended: true}));
booky.use(bodyParser.json());

booky.get("/",(req,res) => {
    return res.json({books:database.author});
});

booky.get("/is/:isbn",(req,res) => {
    const getSpecificBook = database.books.filter((book) => book.ISBN === req.params.isbn);
    if(getSpecificBook.length === 0) {
        return res.json({error:`No book for your ISBN of ${req.params.isbn}`})
    }
    return res.json({data:getSpecificBook});
});

booky.get("/c/:category",(req,res) => {
    const getSpecificBook = database.books.filter((book) => book.category.includes(req.params.category));
    if(getSpecificBook.length === 0 ) {
        return res.json({error:`No book found for the category for ${req.params.category}`});
    }
    return res.json({book:getSpecificBook});
});

booky.get("/l/:language",(req,res)=>{
    const getSpecificBook = database.books.filter((book) => book.language.includes(req.params.language));
    if (getSpecificBook.length === 0) {
        return res.json({error:`No book found for the language ${req.params.language}`});
    }
    return res.json({books: getSpecificBook});
});

booky.post("/book/new",(req,res)  => {
    const newBook = req.body;
    database.books.push(newBook);
    return res.json({updatedBooks:database.books});
});

booky.post("/author/new",(req,res) => {
    const newAuthor = req.body;
    database.author.push(newAuthor);
    return res.json(database.author);

});

booky.listen(3000,() => {
    console.log("Server up and running");
});