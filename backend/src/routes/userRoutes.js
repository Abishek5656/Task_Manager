import express from "express";
import {
  addUser,
  updateUser,
  deleteUser,
  getUserById,
  getLogin
} from "../controllers/userController.js";

const router = express.Router();

router.post("/add", addUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);
router.get("/:id", getUserById);

router.get("/login", getLogin)

export default router;