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
router.post("/login", getLogin);

router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);
router.get("/:id", getUserById);


export default router;