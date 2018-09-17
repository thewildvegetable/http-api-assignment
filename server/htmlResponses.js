const fs = require('fs');  
const index = fs.readFileSync(`${__dirname}/../client/client.html`);

//function to handle the index page
const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index); 
  response.end();
};

// function to send an XML object
const respondXML = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'text/xml' });
  // stringify the object
  response.write(XML.stringify(object));
  response.end();
};

// function to show a success status code
const success = (request, response) => {
  const responseXML = '<response><message>This is a successful response</message></response>';

  // send
  respondXML(request, response, 200, responseXML);
};

// function to show a bad request
const badRequest = (request, response, params) => {
  // message to send
  const responseXML = {
    message: 'This request has the required parameters',
  };

  // if the request does not contain a valid=true query parameter
  if (!params.valid || params.valid !== 'true') {
    // set our error message
    responseXML.message = 'Missing valid query parameter set to true';
    responseXML.id = 'badRequest';

    // send a 400 bad request code
    return respondXML(request, response, 400, responseXML);
  }

  // send success code
  return respondXML(request, response, 200, responseXML);
};

// function to show an unauthorized
const unauthorized = (request, response, params) => {
  // message to send
  const responseXML = {
    message: 'This request has the required parameters',
  };

  // if the request does not contain a loggedIn=yes query parameter
  if (params.loggedIn !== 'yes') {
    // set our error message
    responseXML.message = 'Missing loggedIn query parameter set to yes';
    responseXML.id = 'unauthorized';

    // send a 401 unauthorized code
    return respondXML(request, response, 401, responseXML);
  }

  // send success code
  return respondXML(request, response, 200, responseXML);
};

// function to send forbidden error
const forbidden = (request, response) => {
  // error message with a description and consistent error id
  const responseXML = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };

  // return a 403 forbidden code
  respondXML(request, response, 403, responseXML);
};

// function to show internal error
const internal = (request, response) => {
  // error message with a description and consistent error id
  const responseXML = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internalError',
  };

  // return a 500 internal server error code
  respondXML(request, response, 500, responseXML);
};

// function to show not implemented error
const notImplemented = (request, response) => {
  // error message with a description and consistent error id
  const responseXML = {
    message: 'A GET request for this page has not implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  // return a 501 not implemented error code
  respondXML(request, response, 501, responseXML);
};

// function to show not found error
const notFound = (request, response) => {
  // error message with a description and consistent error id
  const responseXML = '<response><message>This is a successful response</message><id>notFound</id></response>';

  // return a 404 not found error code
  respondXML(request, response, 404, responseXML);
};

module.exports = {
  getIndex,
};