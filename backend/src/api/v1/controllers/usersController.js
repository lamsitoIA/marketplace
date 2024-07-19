import { createUser } from "../models/userModel.js";
import { findError } from "../utils/utils.js";
import { byEmail } from "../models/userModel.js";
import jwt from "jsonwebtoken";

const createToken = async (email) => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

export const createNewUser = async (req, res) => {
  try {
    const { user } = req.body;
    const userCreated = await createUser(user);
    res.status(201).json({ userCreated: userCreated });
  } catch (error) {
    console.log(error);
    const errorFound = findError(error.code);
    res.status(errorFound[0]?.status).json({ error: errorFound[0]?.message });
  }
};

export const createNewUserAuthGoogle = async (req, res) => {
  try {
    const user = req.body;
    console.log("create user 1: ", req.body);
    console.log("create user: ", user);
    const findUser = await byEmail(user);
    if (!findUser) {
      const userCreated = await createUser(user);
      const findUser = await byEmail(user);
      const { id_user, email, name, url_icons } = findUser;
      const token = await createToken(email);
      res.status(201).json({
        userCreated,
        message: `Bienvenido, ${name} has iniciado sesion correctamente`,
        code: 200,
        name,
        token,
        id_user,
        url_icons,
      });
    } else {
      const findUser = await byEmail(user);
      const { id_user, email, name, url_icons } = findUser;
      const token = await createToken(email);
      res.status(201).json({
        message: `Bienvenido, ${name} has iniciado sesion correctamente`,
        code: 200,
        name,
        token,
        id_user,
        url_icons,
      });
    }
  } catch (error) {
    console.log(error);
    const errorFound = findError(error.code);
    res.status(errorFound[0]?.status).json({ error: errorFound[0]?.message });
  }
};
