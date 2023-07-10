import express from "express";
import * as userControllers from "../controllers/users.js";

const router = express.Router();

router.post("/signup", userControllers.signup);
router.post("/signin", userControllers.signin);

router.get("/getUserInfo", userControllers.getUserInfo);

export default router;