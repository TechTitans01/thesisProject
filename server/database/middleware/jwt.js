const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Check if the token exists in the headers
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Token missing' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'your-jwt-secret');
    req.user = decoded; // Attach decoded user information to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};
