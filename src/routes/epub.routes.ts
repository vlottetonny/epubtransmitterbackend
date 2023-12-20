import Router from 'express';
import * as epubController from "../controllers/epub.controller";

const router = Router();

router.post("/send", epubController.sendEpub)

export default router;