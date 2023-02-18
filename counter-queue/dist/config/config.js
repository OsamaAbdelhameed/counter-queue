"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var MONGO_UNAME = process.env.MONGO_UNAME || '';
var MONGO_PASS = process.env.MONGO_PASS || '';
var MONGO_URL = "mongodb+srv://".concat(MONGO_UNAME, ":").concat(MONGO_PASS, "@cluster0.4otsw.mongodb.net");
var SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;
exports.config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
};
