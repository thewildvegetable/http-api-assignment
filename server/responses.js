const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

// function to handle the index page
const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

// function to handle the css
const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

// function to send an XML object
const respondXML = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'text/xml' });
  // stringify the object
  response.write(object);
  response.end();
};

// function to send a json object
const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  // stringify the object
  response.write(JSON.stringify(object));
  response.end();
};

// function to show a success status code
const success = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = '<response><message>This is a successful response</message></response>';

    // send
    return respondXML(request, response, 200, responseXML);
  }
  const responseJSON = {
    message: 'This is a successful response',
  };

  // send
  return respondJSON(request, response, 200, responseJSON);
};

// function to show a bad request
const badRequest = (request, response, acceptedTypes, params) => {
  if (acceptedTypes[0] === 'text/xml') {
    // if the request does not contain a valid=true query parameter
    if (!params.valid || params.valid !== 'true') {
      // set our error message
      const responseXML = '<response><message>Missing valid query parameter set to true</message><id>notFound</id></response>';

      // send a 400 bad request code
      return respondXML(request, response, 400, responseXML);
    }

    // message to send
    const responseXML = '<response><message>This request has the required parameters</message></response>';
    // send success code
    return respondXML(request, response, 200, responseXML);
  }

  // message to send
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  // if the request does not contain a valid=true query parameter
  if (!params.valid || params.valid !== 'true') {
    // set our error message
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'badRequest';

    // send a 400 bad request code
    return respondJSON(request, response, 400, responseJSON);
  }

  // send success code
  return respondJSON(request, response, 200, responseJSON);
};

// function to show an unauthorized
const unauthorized = (request, response, acceptedTypes, params) => {
  if (acceptedTypes[0] === 'text/xml') {
    // if the request does not contain a loggedIn=yes query parameter
    if (params.loggedIn !== 'yes') {
      // set our error message
      const responseXML = '<response><message>Missing loggedIn query parameter set to yes</message><id>unauthorized</id></response>';

      // send a 401 unauthorized code
      return respondXML(request, response, 401, responseXML);
    }

    // message to send
    const responseXML = '<response><message>This request has the required parameters</message></response>';

    // send success code
    return respondXML(request, response, 200, responseXML);
  }

  // message to send
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  // if the request does not contain a loggedIn=yes query parameter
  if (params.loggedIn !== 'yes') {
    // set our error message
    responseJSON.message = 'Missing loggedIn query parameter set to yes';
    responseJSON.id = 'unauthorized';

    // send a 401 unauthorized code
    return respondJSON(request, response, 401, responseJSON);
  }

  // send success code
  return respondJSON(request, response, 200, responseJSON);
};

// function to send forbidden error
const forbidden = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    // error message with a description and consistent error id
    const responseXML = '<response><message>You do not have access to this content.</message><id>forbidden</id></response>';

    // return a 403 forbidden code
    return respondXML(request, response, 403, responseXML);
  }

  // error message with a description and consistent error id
  const responseJSON = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };

  // return a 403 forbidden code
  return respondJSON(request, response, 403, responseJSON);
};

// function to show internal error
const internal = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    // error message with a description and consistent error id
    const responseXML = '<response><message>Internal Server Error. Something went wrong.</message><id>internalError</id></response>';

    // return a 500 internal server error code
    return respondXML(request, response, 500, responseXML);
  }

  // error message with a description and consistent error id
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internalError',
  };

  // return a 500 internal server error code
  return respondJSON(request, response, 500, responseJSON);
};

// function to show not implemented error
const notImplemented = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    // error message with a description and consistent error id
    const responseXML = '<response><message>A GET request for this page has not implemented yet. Check again later for updated content.</message><id>notImplemented</id></response>';

    // return a 501 not implemented error code
    return respondXML(request, response, 501, responseXML);
  }

  // error message with a description and consistent error id
  const responseJSON = {
    message: 'A GET request for this page has not implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  // return a 501 not implemented error code
  return respondJSON(request, response, 501, responseJSON);
};

// function to show not found error
const notFound = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    // error message with a description and consistent error id
    const responseXML = '<response><message>This is a successful response</message><id>notFound</id></response>';

    // return a 404 not found error code
    return respondXML(request, response, 404, responseXML);
  }

  // error message with a description and consistent error id
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  // return a 404 not found error code
  return respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  getIndex,
  getCSS,
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
