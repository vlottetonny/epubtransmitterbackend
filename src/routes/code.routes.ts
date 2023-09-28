import Router from 'express';
import * as codeController from "../controllers/code.controller";

const router = Router();

router.get("/get", codeController.getCode)
router.post("/connect", codeController.connectCode)

export default router;