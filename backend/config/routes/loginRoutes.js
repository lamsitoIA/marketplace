import express from "express";
import { loginUser } from "../../src/api/v1/controllers/loginController.js";
import { validparameters } from "../../middlewares/validateParamsLogin.js";
const router = express.Router();

router.post("/auth_user",validparameters,loginUser);

export default router;

