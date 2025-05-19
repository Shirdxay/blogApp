const http = require("http");
const fs = require("fs");
//create server
// the callback function will run at each request
//response to the client is done within this scope
const server = http.createServer((req, res) => {
  //url and method properties are useful for routing
  console.log(req.url, req.method);

  // prepare to respond
  //set header content to respond with type: HTML so that the browser can render HTML page
  res.setHeader("content-type", "text/html");

  //routing by checking the url
  let path = "./views/";
  switch (req.url) {
    case "/":
      path += "index.html";
      break;

    case "/about":
      path += "about.html";
      break;

    case "/about-you": //redirecting to about.html when request to /about-me
      res.statusCode = 301; //redirecting status code
      res.setHeader("Location", "/about"); //redirect to /about
      res.end();
      break;
    default:
      path += "404.html";
  }
  // up to this line, the server is not yet responded to the client

  //respond with an HTML file
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.write(data);
      res.end();
      // or we can use
      // res.end(data);
    }
  });
});

// turn on the server (put it on listen mode)
// the callback will only run once at the begining of execution
// port 3000 is typically used in web development
const PORT = 3000;
server.listen(PORT, "localhost", () => {
  console.log(`listening for requests on PORT: ${PORT}`);
});

/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

/* COMMAND TO USE

npm init           -> to keep track of dependencies. this command will create
                      package.json and package-lock.json
                      do this at the very first step of your PROJECT

npm i -g nodemon   -> install package (nodemon) globally
                      nodemon filename.js       -> to run file

npm i lodash       -> install package (loadash) locally. check in package.json for dependencies

npm install        -> to install the missing node modules that are present in package.json
                      when people upload their code to github, they wont upload the node modules.
*/
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
