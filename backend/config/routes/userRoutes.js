import express from "express";
import { createNewUser } from "../../src/api/v1/controllers/usersController.js";
import { validateParamsUsers } from "../../middlewares/validateParamsUsers.js";


const router = express.Router();

router.post("/users",validateParamsUsers, createNewUser);

export default router;