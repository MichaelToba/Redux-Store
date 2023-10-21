const jwt = require('jsonwebtoken');

const secret = 'yourSecretKey'; // Need to replace 
const expiration = '1h'; // You can set the expiration time as needed

module.exports = {
  authMiddleware: function ({ req }) {
    // Extract the token from the request
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token
        .split(' ')
        .pop()
        .trim();
    }

    // If no token is found, simply return the request as is
    if (!token) {
      return req;
    }

    try {
      // Verify the token and decode the user data
      const { data } = jwt.verify(token, secret, { expiresIn: expiration });

      // Attach user data to the request for later use
      req.user = data;
    } catch (err) {
      // Handle token verification errors
      console.log('Invalid token:', err.message);
    }

    return req;
  },
  signToken: function ({ firstName, email, _id }) {
    // Create a payload with user data
    const payload = { firstName, email, _id };

    // Sign the token with the payload and secret key
    const token = jwt.sign({ data: payload }, secret, { expiresIn: expiration });

    return token;
  },
};
