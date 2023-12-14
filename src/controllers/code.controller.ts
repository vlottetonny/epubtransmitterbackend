import { Request, Response } from "express";
import * as codeService from "../services/code.service";

/**
 * Handles the GET request to retrieve a code.
 *
 * @async
 * @function
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>} - A Promise that resolves when the response has been sent.
 */
export const getCode = async (req: Request, res: Response) => {
    try {
        const code = await codeService.getCode();
        res.status(200).send(code);
    } catch (error) {
        console.error(error);
        res.status(500).send("An internal server error occurred.");
    }
}

/**
 * Handles the POST request to connect a code.
 *
 * @async
 * @function
 * @param {Request} req - The Express request object. The request body should contain a 'code' property.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>} - A Promise that resolves when the response has been sent.
 */
export const connectCode = async (req: Request, res: Response) => {
    console.log ("connectCode" + req.body.code);
    try {
        const code = String(req.body.code);
        const connectResponse = await codeService.connectCode(code);
        console.log("connectResponse: " + connectResponse);
        if (connectResponse) {
            res.status(200).send(connectResponse);
        } else if (connectResponse === false) {
            res.status(400).send("The code is invalid or already in use.");
        } else {
            res.status(500).send("The connection could not be made, please check your code and try again.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("An internal server error occurred.");
    }
}