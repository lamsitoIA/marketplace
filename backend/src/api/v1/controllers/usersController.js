import { createUser } from "../models/userModel.js";
import { findError } from "../utils/utils.js";

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
