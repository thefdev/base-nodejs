import { Router } from "express";
import { login, logout } from "../use-case/auth/auth.ctrl";

const router = Router();

router.post("/login", login);
router.post("/logout", logout);

export default router;
