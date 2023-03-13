// Import Packages
import * as rtr from "express";
import {
  getObjects,
  getObjectsByUser,
  getObject,
  createObject,
  updateObject,
  deleteObject,
} from "../controllers/object.controller";
// Configure Routes
const router = rtr.Router();

// Routes Object
router.get("/", getObjects);
router.get("/user", getObjectsByUser);
router.get("/:id", getObject);
router.post("/create", createObject);
router.patch("/:id", updateObject);
router.delete("/:id", deleteObject);

export default router;
