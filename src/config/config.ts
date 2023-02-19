import dotenv from 'dotenv';

dotenv.config();

const MONGO_UNAME = process.env.MONGO_UNAME || '';
const MONGO_PASS = process.env.MONGO_PASS || '';
const MONGO_URL = `mongodb+srv://${MONGO_UNAME}:${MONGO_PASS}@cluster0.4otsw.mongodb.net`;

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
};
