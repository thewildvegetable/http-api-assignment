// add modules
const http = require('http');
const url = require('url');
const query = require('querystring');

const responseHandler = require('./responses.js');

const urlStruct = {
  '/': responseHandler.getIndex,
  '/style.css': responseHandler.getCSS,
  '/success': responseHandler.success,
  '/badRequest': responseHandler.badRequest,
  '/unauthorized': responseHandler.unauthorized,
  '/forbidden': responseHandler.forbidden,
  '/internal': responseHandler.internal,
  '/notImplemented': responseHandler.notImplemented,
  '/notFound': responseHandler.notFound,
  notFound: responseHandler.notFound,
};

// set the port
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// handle HTTP requests.
const onRequest = (request, response) => {
  // parse the url
  const parsedUrl = url.parse(request.url);

  // grab the query parameters
  const params = query.parse(parsedUrl.query);
  const acceptedTypes = request.headers.accept.split(',');

  // check if the path name exists
  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, acceptedTypes, params);
  } else {
    urlStruct.notFound(request, response, params);
  }
};

// start server
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
