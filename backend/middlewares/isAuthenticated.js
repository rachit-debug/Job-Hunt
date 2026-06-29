import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  try {
    console.log("\n========== AUTH MIDDLEWARE ==========");
    console.log("Method:", req.method);
    console.log("URL:", req.originalUrl);

    console.log("\nHeaders:");
    console.log(req.headers);

    console.log("\nAuthorization Header:");
    console.log(req.headers.authorization);

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      console.log("❌ Authorization header is missing");
      return res.status(401).json({
        success: false,
        message: "No Authorization header found",
      });
    }

    if (!authHeader.startsWith("Bearer ")) {
      console.log("❌ Authorization header is not Bearer");
      return res.status(401).json({
        success: false,
        message: "Invalid Authorization format",
      });
    }

    const token = authHeader.split(" ")[1];

    console.log("\nExtracted Token:");
    console.log(token);

    if (!token) {
      console.log("❌ Token is empty");
      return res.status(401).json({
        success: false,
        message: "No token found",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    console.log("\nDecoded Token:");
    console.log(decoded);

    req.id = decoded.userId;

    console.log("✅ Authentication Successful");
    console.log("===============================\n");

    next();
  } catch (err) {
    console.log("\n❌ JWT ERROR");
    console.log(err.name);
    console.log(err.message);
    console.log(err);

    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

export default isAuthenticated;
