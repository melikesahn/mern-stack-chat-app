import express from "express";
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessages, sendMessage } from "../controllers/message.controller.js";

const router =express.Router();

router.post( "/signup", signup )
router.post( "/login",login )
router.post( "/logout",logout )
router.put("/update-profile",protectRoute,updateProfile)
router.get("/check",protectRoute,checkAuth)
router.get("/:id",protectRoute,getMessages)
router.get("/send/:id",protectRoute,sendMessage)

export default router;