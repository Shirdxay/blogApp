const express = require("express");
const app = express();
const morgan = require("morgan");

app.set("view engine", "ejs");
app.listen(3000);

//create middleware to log any requests
// if we were to run this middleware without specifying next();
// the browser would hang as it doesnt know where to go next
app.use((req, res, next) => {
  console.log("new request mande: ");
  console.log("host: ", req.hostname);
  console.log("path :", req.path);
  console.log("method: ", req.method);
  next();
});
// next() doesnt have to be named as such
app.use((req, res, n) => {
  console.log("in the second middleware");
  n();
});

//using static middleware to make resources public to the browser
// client can access the resource through browser url
// linking css is possible now. but do not write ...href="./public/style.css"
// ...href="style.css" is enough
// express designated 'public' folder as default folder for resource access by brownser
// the word public will not visible in brownser.
// you can type http://localhost:3000/style.css and get access to
// http://localhost:3000/public/style.css

app.use(express.static("public"));
// using morgan middleware for logging
app.use(morgan("dev"));

app.get("/", (req, res) => {
  const blogs = [
    { title: "Yoshi finds eggs", snippet: "Lorem ipsoum Yoshi finds eddg" },
    {
      title: "Nishi finds chicken",
      snippet: "Lorem ipsoum nichi finds cheicke",
    },
    {
      title: "How to defreat brongs",
      snippet: "Lorem ipsoum Yoshi ffidn bruownd fts tc",
    },
  ];
  res.render("index", { title: "Home", blogs: blogs });
});
//third middleware
// when user click on BLOGS (which is index), this middleware will not run because app.get('/') above
// already responded to the client. so express stops seaching
app.use((req, res, n) => {
  console.log("in the Third middleware");
  n();
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create blog" });
});

//using middleware for 404
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

/**
 * MIDDLEWARE
 * middleware: a function or a code that runs on server for every request
 * to use the middleware: app.use()
 * middleware run from top to bottom and stop when server responds to clients
 * order of the middleware is important
 * middleware for handling 404 is always at the end
 */

/**
 *popular middleware:
 1. morgan - for logger
 2. helmet - for session and security
 */

/**
 * STATIC FILE
 * client cannot access any files on the server via url
 * cannot link css in the <head>. it wouldnt work because browser cannot get access
 * ->> use static middleware to make it public
 */
