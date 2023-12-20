import { GridFSBucket } from "mongodb";
import fs from "fs";
import { BaseRepository } from "./base.repository";

interface EpubFile {
    filename: string;
    mimetype: string;
    size: number;
    path: string;
}

export class EpubRepository extends BaseRepository<any> {
    constructor() {
    super(process.env.DB_NAME!, 'epubTransmitter');
}

    async uploadEpub(code: string, epubFile: EpubFile): Promise<void> {
        await this.connect();
        const bucket = new GridFSBucket(BaseRepository.db!, {
            bucketName: this.collectionName
        });

        const stream = fs.createReadStream(epubFile.path);
        const uploadStream = bucket.openUploadStream(epubFile.filename);

        stream.pipe(uploadStream)
            .on('error', (error) => {
                console.error(`Failed to upload file: ${error}`);
            })
            .on('finish', () => {
                console.log('File upload successful');
            });
    }
}