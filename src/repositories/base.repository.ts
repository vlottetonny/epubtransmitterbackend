import { MongoClient, Db, Collection, ServerApiVersion, Document } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

/**
 * MongoDB user from environment variables.
 */
const user = process.env.MONGO_USER;

/**
 * MongoDB password from environment variables.
 */
const password = process.env.MONGO_PASSWORD;

/**
 * MongoDB host from environment variables.
 */
const host = process.env.MONGO_HOST;

/**
 * MongoDB connection URI.
 */
const uri = `mongodb+srv://${user}:${password}@${host}/?retryWrites=true&w=majority`;

/**
 * BaseRepository is an abstract class that provides basic MongoDB operations.
 * It should be extended by other repository classes.
 *
 * @abstract
 * @class
 */
export abstract class BaseRepository<T extends Document> {
    /**
     * MongoDB client instance.
     */
    private static client: MongoClient | null = null;

    /**
     * MongoDB database instance.
     */
    protected static db: Db | null = null;

    /**
     * Creates an instance of BaseRepository.
     *
     * @constructor
     * @param {string} dbName - The name of the database.
     * @param {string} collectionName - The name of the collection.
     */
    constructor(protected dbName: string, protected collectionName: string) {}

    /**
     * Connects to the MongoDB database and returns the collection.
     *
     * @async
     * @method
     * @returns {Promise<Collection<T>>} - The MongoDB collection.
     */
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

    /**
     * Closes the MongoDB connection.
     *
     * @async
     * @method
     * @returns {Promise<void>}
     */
    public async close(): Promise<void> {
        if (BaseRepository.client) {
            await BaseRepository.client.close();
            BaseRepository.client = null;
            BaseRepository.db = null;
        }
    }
}