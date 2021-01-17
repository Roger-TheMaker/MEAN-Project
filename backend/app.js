const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extented: false}));

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
  const post=req.body;
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully'
  });
});

//user() is a middleware function, ceva se pune intre entitati, ca o palnie
app.get('/api/posts',(req,res, next) => {
  const posts =[
    { id: '1234' ,
      title : 'First server-side post',
      content: 'This is coming from the server'
    },
    { id: 'gesagea' ,
      title : 'Second server-side post',
      content: 'This is coming from the server!'
  }
  ];
  res.status(200).json({
    message: 'Posts fetched succesfully!',
    posts: posts
  });
});

module.exports = app;
