//add modules
const http = require('http');
const url = require('url');
const query = require('querystring'); 

//add out custom files
const htmlHandler = require('./htmlResponses.js'); 
const jsonHandler = require('./jsonResponses.js');

//url paths
const urlStruct = {
  '/': htmlHandler.getIndex,
  '/success': jsonHandler.success,
  '/badRequest': jsonHandler.badRequest,
  notFound: jsonHandler.notFound,
};

//set the port
const port = process.env.PORT || process.env.NODE_PORT || 3000;

//handle HTTP requests.
const onRequest = (request, response) => {
  //parse the url
  const parsedUrl = url.parse(request.url);
  
  //grab the query parameters
  const params = query.parse(parsedUrl.query);

  //check if the path name exists
  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, params);
  } else {
    urlStruct.notFound(request, response, params);
  }
};

//start server 
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);