// function to send a json object
const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  // stringify the object
  response.write(JSON.stringify(object));
  response.end();
};

// function to show a success status code
const success = (request, response) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  // send
  respondJSON(request, response, 200, responseJSON);
};

// function to show a bad request
const badRequest = (request, response, params) => {
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
const unauthorized = (request, response, params) => {
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
const forbidden = (request, response) => {
  // error message with a description and consistent error id
  const responseJSON = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };

  // return a 403 forbidden code
  respondJSON(request, response, 403, responseJSON);
};

// function to show internal error
const internal = (request, response) => {
  // error message with a description and consistent error id
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internalError',
  };

  // return a 500 internal server error code
  respondJSON(request, response, 500, responseJSON);
};

// function to show not implemented error
const notImplemented = (request, response) => {
  // error message with a description and consistent error id
  const responseJSON = {
    message: 'A GET request for this page has not implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  // return a 501 not implemented error code
  respondJSON(request, response, 501, responseJSON);
};

// function to show not found error
const notFound = (request, response) => {
  // error message with a description and consistent error id
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  // return a 404 not found error code
  respondJSON(request, response, 404, responseJSON);
};


module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
