import { MongoClient, Db, Collection, ServerApiVersion, Document } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const host = process.env.MONGO_HOST;

const uri = `mongodb+srv://${user}:${password}@${host}/?retryWrites=true&w=majority`;

export abstract class BaseRepository<T extends Document> {
    private static client: MongoClient | null = null;
    protected static db: Db | null = null;

    constructor(protected dbName: string, protected collectionName: string) {}

    protected async connect(): Promise<Collection<T>> {
        if (!BaseRepository.client) {
            BaseRepository.client = await MongoClient.connect(uri, {
                serverApi: {
                    version: ServerApiVersion.v1,
                    strict: true,
                    deprecationErrors: true,
                }
            });
            BaseRepository.db = BaseRepository.client.db(this.dbName);
        }
        return BaseRepository.db!.collection<T>(this.collectionName);
    }

    public async close(): Promise<void> {
        if (BaseRepository.client) {
            await BaseRepository.client.close();
            BaseRepository.client = null;
            BaseRepository.db = null;
        }
    }
}
