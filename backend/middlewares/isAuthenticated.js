  import jwt from "jsonwebtoken";


  const isAuthenticated = async (req, res, next) => {
    try {
      const token = req.cookies.token;

      if (!token) {
        return res.status(401).json({
          message: " user is not authenticated1",
          success: false,
        });
      }

      const decode = jwt.verify(token, process.env.SECRET_KEY);

      if (!decode) {
        return res.status(401).json({
          message: "user is not authenticated2",
          success: false,
        });
      }

      req.id = decode.userId;

      next();
    } catch (err) {
      console.log(err);
    }
  };

  export default isAuthenticated;
