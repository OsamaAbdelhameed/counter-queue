"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var Logging = /** @class */ (function () {
    function Logging() {
    }
    var _a;
    _a = Logging;
    Logging.log = function (args) { return _a.info(args); };
    Logging.info = function (args) { return console.log(chalk_1.default.green("[".concat(new Date().toLocaleString(), "] [INFO]")), typeof args === 'string' ? chalk_1.default.greenBright(args) : args); };
    Logging.warn = function (args) { return console.log(chalk_1.default.yellow("[".concat(new Date().toLocaleString(), "] [WARN]")), typeof args === 'string' ? chalk_1.default.yellowBright(args) : args); };
    Logging.err = function (args) { return console.log(chalk_1.default.red("[".concat(new Date().toLocaleString(), "] [ERR]")), typeof args === 'string' ? chalk_1.default.redBright(args) : args); };
    return Logging;
}());
exports.default = Logging;
