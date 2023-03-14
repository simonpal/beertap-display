import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import config from "../config";

export const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password) => {
  return bcrypt.hash(password, 5);
};

export const createJWT = (user): string => {
  const { id, username } = user;
  const token = jwt.sign({ id, username }, config.secrets.jwt);
  return token;
};

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({ message: "Not authorized" });
    return;
  }

  const [_, token] = bearer.split(" ");

  if (!token) {
    res.status(401);
    res.json({ message: "Not a valid token" });
    return;
  }

  try {
    const payload = jwt.verify(token, config.secrets.jwt);
    req.user = payload;
    console.log(payload);
    next();
  } catch (e) {
    console.error(e);
    res.status(401);
    res.send({ messaage: "Could not verify user" });
    return;
  }
};
