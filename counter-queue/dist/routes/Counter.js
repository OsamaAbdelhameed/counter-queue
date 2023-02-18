"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var Counter_1 = __importDefault(require("../controllers/Counter"));
var ValidateSchema_1 = require("../middleware/ValidateSchema");
var router = express_1.default.Router();
router.post('/create', (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.counter.create), Counter_1.default.createCounter);
router.get('/get/:num', Counter_1.default.getCounter);
router.get('/get', Counter_1.default.getAllCounter);
router.patch('/update/:num', (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.counter.update), Counter_1.default.updateCounter);
module.exports = router;
