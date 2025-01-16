import express from "express";
import { deleteEmail, getAllEmailById, sendMessageToUser } from "../controllers/email.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

// router.route("/create").post(isAuthenticated , createEmail)
router.route("/delete/:id").delete(isAuthenticated , deleteEmail)
router.route("/getallemails").get(isAuthenticated , getAllEmailById)
router.post("/send-message", isAuthenticated, sendMessageToUser);

export default router;