"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var Customer_1 = __importDefault(require("../controllers/Customer"));
var ValidateSchema_1 = require("../middleware/ValidateSchema");
var router = express_1.default.Router();
router.post('/create', (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.customer.create), Customer_1.default.createCustomer);
router.get('/get/:branchNo', Customer_1.default.getCustomer);
router.get('/get', Customer_1.default.getAllCustomer);
router.patch('/update/:branchNo', (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.customer.update), Customer_1.default.updateCustomer);
module.exports = router;
