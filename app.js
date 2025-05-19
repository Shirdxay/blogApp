const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
require('dotenv').config();

//express app
const app = express();

//connect to mongoDB atlas
const dbURI = process.env.MONGODB_URI;

mongoose
  .connect(dbURI)
  .then((result) => {
    app.listen(process.env.PORT);
    console.log(`server listening on port ${process.env.PORT}`);
  })
  .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// serve static files(make public to browser)
//app.use(express.static('public'));
app.use('/mycss', express.static('public'));

// use this parser to handle PUT from form submission by front-end
// without this, we cannot access to res.body
app.use(express.urlencoded({ extended: true }));
/**
 * REQUEST TYPES TO IMPLEMENT BELOW:
 * localhost:3000/blogs             GET
 * localhost:3000/blogs/create      GET
 * localhost:3000/blogs             POST
 * localhost:3000/blogs/:id         GET
 * localhost:3000/blogs/:id         DELETE
 *
 * 'id' is called route parameter
 */

//redirecting from home rout to /blogs
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

//blogs
app.get('/blogs', (req, res) => {
  Blog.find()
    .then((result) => {
      res.render('index', { title: 'blogs', blogs: result });
    })
    .catch((err) => console.log(err));
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.post('/blogs', (req, res) => {
  console.log(req.body);
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create blog' });
});

app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      console.log(result); /////////
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch((err) => {
      console.log('error id');
      console.log(err);
    });
});

//newly implemented
app.delete('/blogs/:id', (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json({ redirect: '/blogs' });
      console.log('deleted');
    })
    .catch((err) => {
      res.status(500).json({ error: 'Could not delete blog' });
    });
});

//404 page handling using middleware
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
