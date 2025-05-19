const express = require("express");
//express app
const app = express();

//register view engine
//as a default, it assume there is the 'view' folder under the root directory
// if you want to set the target 'view' folder manually, use
// app.set('views', 'foldername-myviews');
app.set("view engine", "ejs");

//listen for requests
app.listen(3000);

/** Handling GET request to root '/' */
app.get("/", (req, res) => {
  /**Express only (no EJS) */
  //By using send(): content-type and statusCode is automatically inferred
  //use sendfile() to respond with a file (HTML)
  //  res.send('<p> hello </p>');
  //  res.sendFile("./views/index.html", { root: __dirname });

  /**Using EJS */
  // render() with EJS engine
  // pass object to view
  // this data will enventually comes from a database in realworld situation
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
  res.render("index", { title: "Home", blogs: blogs }); //input blogs object will infer propertyname
  //alternatively, blogs object doesnt need a property name when passing to views. the property is automatically inferred
  //  res.render("index", { title: "Home", blogs});
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//EJS redirecting to /about
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create blog" });
});

// app.use() is for using middleware. there is no path to specify, meaning this will run
// at each request without checking the path.
// Express read from top-down
// the following code should come at the end of the file because it should reach here when all else fails
app.use((req, res) => {
  /**Express only (No EJS) */
  //res.status(404).sendFile("./view/404.html", { root: __dirname });

  /**with EJS */
  res.status(404).render("404", { title: "404" });
});
