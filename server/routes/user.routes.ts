// Import Packages
import * as rtr from "express";
import { signup, login } from "../controllers/auth.controller";
// Configure Routes
const router = rtr.Router();

// Routes User
router.post("/signup", signup);
router.post("/login", login);

export default router;
