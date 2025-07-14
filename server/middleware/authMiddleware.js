  import jwt from 'jsonwebtoken';
  import User from '../models/UserModel.js'; 

  const verifyToken = async (req, res, next) => {
    try {
      const header = req.headers.authorization;

      // Check if the request has an authorization header
      if (!header || !header.startsWith('Bearer ')) { 
        return res.status(401).json({ message: 'Unauthorized' });
      } 

      // Extract token after Bearer
      const token = header.split(' ')[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);    

      // Find the user by ID from the token 
      // Dont include password in the user object for security
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Attach user to request object for any subsequent middleware or route handlers
      req.user = user;

      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error('Authentication error:', error);
      res.status(401).json({ message: 'Unauthorized' });
    }
  }

  export default verifyToken;