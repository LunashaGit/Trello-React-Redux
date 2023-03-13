import * as rtr from "express";
import { signup, login } from "../controllers/auth.controller";

const router = rtr.Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;
