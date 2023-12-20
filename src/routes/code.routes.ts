import Router from 'express';
import * as codeController from "../controllers/code.controller";

/**
 * Express router to mount code related functions on.
 * @type {Router}
 * @const
 */
const router = Router();

/**
 * Route serving code retrieval.
 * @name get/get
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get("/get", codeController.getCode)

/**
 * Route serving code connection.
 * @name post/connect
 * @function
 * @memberof module:router
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post("/connect", codeController.connectCode)

/**
 * Express router to expose code related routes.
 * @exports router
 */
export default router;