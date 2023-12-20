import { EpubRepository } from "../repositories/epub.repository";

interface EpubFile {
    filename: string;
    mimetype: string;
    size: number;
    path: string;
}

const epubRepository = new EpubRepository();

export async function processEpub(code: string, epubFile: EpubFile): Promise<void> {
    // Call the repository function to upload the file to MongoDB
    await epubRepository.uploadEpub(code, epubFile);
}