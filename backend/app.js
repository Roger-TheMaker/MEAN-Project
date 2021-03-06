const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/posts');

const app = express();

mongoose.connect("mongodb+srv://max:ZtYiuQbNzN335eqg@cluster0.3dwzl.mongodb.net/node-angular?retryWrites=true&w=majority")
.then(() => {
  console.log('Connected to database!');
})
.catch(() => {
  console.log('Connection failed!');
});

app.use(bodyParser.json());

// here i wanna manipulate the request to avoid CORS
app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  //nu conteaza pe ce domain se afla app ul care imi trimite requestul,
  //pentru ca eu vreau sa imi poate accesa resursele
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type,Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
      );
  next();
});

app.post("/api/posts",(req,res, next) =>{
  const post= new Post({
    title: req.body.title,
    content:req.body.content
  });
  post.save().then( createdPost => {
     res.status(201).json({
       message: 'Post added successfully',
       postId: createdPost._id
    });
  });
});

//user() is a middleware function, ceva se pune intre entitati, ca o palnie
app.get("/api/posts", (req, res, next) => {
  Post.find()
  .then(documents => {
      res.status(200).json({
        message: 'Posts fetched succesfully!',
        posts: documents
      });
    });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: 'Post deleted!'});
  });
})

module.exports = app;
