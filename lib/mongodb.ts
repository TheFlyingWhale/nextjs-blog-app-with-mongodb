import * as mongoDB from "mongodb";
import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.DB_NAME;

// check the MongoDB URI
if (!MONGODB_URI) {
    throw new Error("Define the MONGODB_URI environmental variable");
}

// check the MongoDB DB
if (!MONGODB_DB) {
    throw new Error("Define the MONGODB_DB environmental variable");
}

let cachedClient: mongoDB.MongoClient | null = null;
let cachedDb: mongoDB.Db | null = null;
let collection: mongoDB.Collection | null = null;

export const connectToDatabase: () => Promise<{
    client: mongoDB.MongoClient;
    db: mongoDB.Db;
}> = async () => {
    // check the cache
    if (cachedClient && cachedDb) {
        // load from cache
        return {
            client: cachedClient,
            db: cachedDb,
        };
    }

    // connect to cluster
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db(MONGODB_DB);

    // set cache
    cachedClient = client;
    cachedDb = db;

    return {
        client: cachedClient,
        db: cachedDb,
        collection: collection,
    };
};
