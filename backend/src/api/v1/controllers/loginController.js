import { byEmail } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findError } from "../utils/utils.js";
/* vendedor de lapiz y jean pasando lomotoro ala coño he la madre*/
const loginUser = async (req, res) => {
  const { user } = req.body;

  try {
    const findUser = await byEmail(user);

    if (!findUser) {
      return await sendErrorResponse(res, "auth_01");
    }

    const isPasswordValid = bcrypt.compareSync(
      user.password,
      findUser.password
    );

    if (!isPasswordValid) {
      return await sendErrorResponse(res, "auth_02");
    }

    const { id_user, email, name, url_icons } = findUser; /* esto es lo que le vamos a enviar al front */
    const token = await createToken(email);
    res.status(200).json({
      message: `Bienvenido, ${name} has iniciado sesion correctamente`,
      code: 200,
      name,
      token,
      id_user,
      url_icons,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createToken = async (email) => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

const sendErrorResponse = async (res, errorCode) => {
  const errorFound = findError(errorCode);
  res.status(errorFound[0].status).json({ error: errorFound[0].message });
};

export { loginUser };
/* {
  "user":{
    "email":"test1@test.com",
    "password":"123456"
  }
    
  } */
//pruebas en el thunder client
