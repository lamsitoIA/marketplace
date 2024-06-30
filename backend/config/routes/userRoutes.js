import express from "express";
import { createNewUser, createNewUserAuthGoogle } from "../../src/api/v1/controllers/usersController.js";
import { validateParamsUsers } from "../../middlewares/validateParamsUsers.js";


const router = express.Router();

router.post("/users",validateParamsUsers, createNewUser);
router.post("/users/auth_google", createNewUserAuthGoogle);

export default router;