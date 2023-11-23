import { Request, Response } from "express";
import * as codeService from "../services/code.service";

export const getCode = async (req: Request, res: Response) => {
    try {
        const code = await codeService.getCode();
        res.status(200).send(code);
    } catch (error) {
        console.error(error);
        res.status(500).send("An internal server error occurred.");
    }
}

export const connectCode = async (req: Request, res: Response) => {
    try {
        const code = String(req.body.code);
        const connectResponse = await codeService.connectCode(code);
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