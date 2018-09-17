// add modules
const http = require('http');
const url = require('url');
const query = require('querystring');

// add out custom files
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

// url paths
const jsonStruct = {
  '/success': jsonHandler.success,
  '/badRequest': jsonHandler.badRequest,
  '/unauthorized': jsonHandler.unauthorized,
  '/forbidden': jsonHandler.forbidden,
  '/internal': jsonHandler.internal,
  '/notImplemented': jsonHandler.notImplemented,
  '/notFound': jsonHandler.notFound,
  notFound: jsonHandler.notFound,
};

const xmlStruct = {
  '/': htmlHandler.getIndex,
  '/badRequest': htmlHandler.badRequest,
  '/unauthorized': htmlHandler.unauthorized,
  '/forbidden': htmlHandler.forbidden,
  '/internal': htmlHandler.internal,
  '/notImplemented': htmlHandler.notImplemented,
  '/notFound': htmlHandler.notFound,
  notFound: htmlHandler.notFound,
}

// set the port
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// handle HTTP requests.
const onRequest = (request, response) => {
  // parse the url
  const parsedUrl = url.parse(request.url);

  // grab the query parameters
  const params = query.parse(parsedUrl.query);

  // check if the path name exists
  if (xmlStruct[parsedUrl.pathname]) {
    //check if type exists
    if (params.type && params.type === 'application/json'){
        jsonStruct[parsedUrl.pathname](request, response, params);
    }
    xmlStruct[parsedUrl.pathname](request, response, params);
  } else {
    jsonStruct.notFound(request, response, params);
  }
};

// start server
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
