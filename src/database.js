import mongoose from 'mongoose';
import MongoMemoryServer from "mongodb-memory-server";
require('dotenv').config();

const urlmongo = `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;

export function getMongoose() {
    mongoose.connect(urlmongo, {
        useNewUrlParser: true
    });
    return mongoose.connection;
}

export async function mockMongoose() {
    const mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getConnectionString();
    mongoose.connect(mongoUri, {useNewUrlParser: true});
    return mongoose.connection;
}

