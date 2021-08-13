const authorize = (req, _, next) => {
  if (req.role === "admin") {
    next();
  } else {
    next({ name: "ROLE NOT AUTHORIZED" });
  }
};

module.exports = authorize;
