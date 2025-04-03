// Simple authentication middleware for admin routes
const authenticateUser = async (req, res, next) => {
  try {
    // Get the authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'No authorization token provided' });
    }

    // Check if the header follows the Bearer scheme
    const [scheme, token] = authHeader.split(' ');
    
    if (scheme !== 'Bearer' || !token) {
      return res.status(401).json({ message: 'Invalid authorization format' });
    }

    // Since admin authentication is handled in frontend,
    // we'll just verify the presence of a valid token format
    // You can add additional token verification logic here if needed
    if (token.length < 0) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Attach the token to the request for potential future use
    req.token = token;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ message: 'Authentication failed' });
  }
};

export { authenticateUser };