const authorize = (req, _, next) => {
  console.log("aaaa");
  if (req.role === "admin") {
    next();
  } else {
    next({ name: "ROLE NOT AUTHORIZED" });
  }
};

module.exports = authorize;
