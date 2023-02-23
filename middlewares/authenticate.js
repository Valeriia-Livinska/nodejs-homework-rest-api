const  jwt = require("jsonwebtoken");
const { Unauthorized, BadRequest } = require("http-errors");
const { User } = require("../models/user");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  if (req.method === "options") { 
    next();
  }

  const { authorization = "" } = req.headers;
  if (!authorization) {
    next(BadRequest("No token provided"));
  }

  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(Unauthorized("Not authorized"));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw new Unauthorized("Not authorized");
    }
    req.user = user;
    next();
  } catch {
    next(Unauthorized("Not authorized"));
  }
};

module.exports = authenticate;
