import * as rtr from "express";
import {
  getObjects,
  getObjectsByUser,
  getObject,
  createObject,
  updateObject,
  deleteObject,
} from "../controllers/object.controller";

const router = rtr.Router();

router.get("/", getObjects);
router.get("/user", getObjectsByUser);
router.get("/:id", getObject);
router.post("/", createObject);
router.patch("/:id", updateObject);
router.delete("/:id", deleteObject);

export default router;
