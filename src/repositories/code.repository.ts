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
        console.log(`Checking if code exists: ${code}`);
        const collection = await this.connect();
        const count = await collection.countDocuments({ code });
        console.log(`Code exists count: ${count}`);
        return count > 0;
    }

    async codeInUse(code: string): Promise<boolean> {
        console.log(`Checking if code is in use: ${code}`);
        const collection = await this.connect();
        const currentCode = await collection.findOne({ code });
        console.log(`Current code: ${JSON.stringify(currentCode)}`);
        if (currentCode) {
            return currentCode.inUse;
        } else {
            return false;
        }
    }

    async updateCode(code: string, inUse: boolean): Promise<void> {
        console.log(`Updating code: ${code}, inUse: ${inUse}`);
        const collection = await this.connect();
        await collection.updateOne({ code }, { $set: { inUse } });
    }

    async insertCode(code: string): Promise<void> {
        console.log(`Inserting code: ${code}`);
        const collection = await this.connect();
        await collection.insertOne({ code, inUse: false });
    }
}
export const codeRepository = new CodeRepository();