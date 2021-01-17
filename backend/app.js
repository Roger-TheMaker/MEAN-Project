const express = require('express');

const app = express();

app.use((req,res, next) => {
  next();
});

//user() is a middleware function, ceva se pune intre entitati, ca o palnie
app.use((req,res, next) => {
  res.send('hello from express');
});

module.exports = app;
