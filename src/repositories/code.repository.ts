import { BaseRepository } from './base.repository';

interface Code {
    code: string;
    inUse: boolean;
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

    async codeInUse(code: string): Promise<boolean> {
        const collection = await this.connect();
        const currentCode = await collection.findOne({ code });
        if (currentCode) {
            return currentCode.inUse;
        } else {
            return false;
        }
    }

    async updateCode(code: string, inUse: boolean): Promise<void> {
        const collection = await this.connect();
        await collection.updateOne({ code }, { $set: { inUse } });
    }

    async insertCode(code: string): Promise<void> {
        const collection = await this.connect();
        await collection.insertOne({ code, inUse: false });
    }
}

export const codeRepository = new CodeRepository();
