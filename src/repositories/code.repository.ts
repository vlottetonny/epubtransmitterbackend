import { BaseRepository } from './base.repository';

interface Code {
    code: string;
}

class CodeRepository extends BaseRepository<Code> {
    constructor() {
        super('epubTransmitter', 'codes');
    }

    async codeExists(code: string): Promise<boolean> {
        const collection = await this.connect();
        const count = await collection.countDocuments({ code });
        return count > 0;
    }

    async insertCode(code: string): Promise<void> {
        const collection = await this.connect();
        await collection.insertOne({ code });
    }
}

export const codeRepository = new CodeRepository();
