"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var mongoose_1 = __importDefault(require("mongoose"));
var config_1 = require("./config/config");
var Logging_1 = __importDefault(require("./library/Logging"));
var Counter_1 = __importDefault(require("./routes/Counter"));
var Customer_1 = __importDefault(require("./routes/Customer"));
var router = (0, express_1.default)();
mongoose_1.default
    .connect(config_1.config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(function () {
    Logging_1.default.info('connected to MongoDB');
    StartServer();
})
    .catch(function (err) {
    Logging_1.default.err('Unable to connect');
    Logging_1.default.err(err);
});
/** Only start the server if its connected to mongo **/
var StartServer = function () {
    router.use(function (req, res, next) {
        /** Log the Request */
        Logging_1.default.info("Incoming -> Method: [".concat(req.method, "] - Url: [").concat(req.url, "] - IP: [").concat(req.socket.remoteAddress, "]"));
        res.on('finish', function () {
            /** Log the Response */
            Logging_1.default.info("Incoming -> Method: [".concat(req.method, "] - Url: [").concat(req.url, "] - IP: [").concat(req.socket.remoteAddress, "] - Status: [").concat(res.statusCode, "]"));
        });
        next();
    });
    router.use(express_1.default.urlencoded({ extended: true }));
    router.use(express_1.default.json());
    /** Rules of our API */
    router.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });
    /** Routes */
    router.use('/counter', Counter_1.default);
    router.use('/customer', Customer_1.default);
    /** Healthcheck */
    router.get('/ping', function (req, res, next) { return res.status(200).json({ message: 'pong' }); });
    /** Error Handling */
    router.use(function (req, res, next) {
        var error = new Error('not found');
        Logging_1.default.err(error);
        return res.status(404).json({ message: error.message });
    });
    http_1.default.createServer(router).listen(config_1.config.server.port, function () { return Logging_1.default.info("Server is running on port ".concat(config_1.config.server.port)); });
};
