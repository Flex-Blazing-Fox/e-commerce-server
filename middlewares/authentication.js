const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  if (!req.headers.access_token) {
    next({ name: "INVALID TOKEN / TOKEN NOT EXIST" });
  } else {
    try {
      const decodedToken = jwt.verify(req.headers.access_token, process.env.JWT_SECRET);
      req.userId = decodedToken.id;
      next();
    } catch {
      next({ name: "INVALID TOKEN / TOKEN NOT EXIST" });
    }
  }
};

module.exports = authenticate;
