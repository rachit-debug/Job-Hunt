import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  try {
    console.log("========== AUTH ==========");
    console.log("Origin:", req.headers.origin);
    console.log("Cookie Header:", req.headers.cookie);
    console.log("Parsed Cookies:", req.cookies);

    const token = req.cookies?.token;

    console.log("Token:", token);

    if (!token) {
      return res.status(401).json({
        message: "Token not found",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    console.log("Decoded:", decoded);

    req.id = decoded.userId;
    next();
  } catch (err) {
    console.error("JWT Error:", err);

    return res.status(401).json({
      message: "Invalid token",
      success: false,
    });
  }
};

export default isAuthenticated;
