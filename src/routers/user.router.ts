import { get, create } from "../use-case/user/user.ctrl";
const router = require("express").Router();

router.post("/get", get);
router.post("/create", create);

export default router;
