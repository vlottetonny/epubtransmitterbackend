import { Request, Response, NextFunction } from 'express';
import * as epubService from '../services/epub.service';
import multer from 'multer';

interface MulterRequest extends Request {
    file?: Express.Multer.File;
    body: EpubRequestBody;
}

interface EpubRequestBody {
    code: string;
}

const upload = multer({ dest: 'uploads/' });

export const sendEpub = [
    upload.single('file'),
    async (req: MulterRequest, res: Response, next: NextFunction): Promise<void> => {
        const code = req.body.code;
        const epubFile = req.file;

        if (!epubFile) {
            return next(new Error("No file uploaded"));
        }

        try {
            await epubService.processEpub(code, epubFile);
            res.status(200).send({ message: 'Epub file processed successfully.' });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send({ error: error.message });
            } else {
                res.status(500).send({ error: 'An unknown error occurred' });
            }
        }
    }
];
