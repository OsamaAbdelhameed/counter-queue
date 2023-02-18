"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Customer_1 = __importDefault(require("../models/Customer"));
var createCustomer = function (req, res, next) {
    var _a = req.body, branchNo = _a.branchNo, lastIssued = _a.lastIssued, inProgress = _a.inProgress, queue = _a.queue;
    var customer = new Customer_1.default({
        branchNo: branchNo,
        lastIssued: lastIssued,
        inProgress: inProgress,
        queue: queue
    });
    return customer
        .save()
        .then(function (customer) { return res.status(200).json({ customer: customer }); })
        .catch(function (err) { return res.status(500).json({ err: err }); });
};
var getCustomer = function (req, res, next) {
    var branchNo = req.params.branchNo;
    return Customer_1.default.find({ branchNo: branchNo })
        .then(function (customer) { return (customer ? res.status(200).json({ customer: customer }) : res.status(404).json({ message: 'Not found' })); })
        .catch(function (err) { return res.status(500).json({ err: err }); });
};
var getAllCustomer = function (req, res, next) {
    return Customer_1.default.find()
        .then(function (customers) { return res.status(200).json({ customers: customers }); })
        .catch(function (err) { return res.status(500).json({ err: err }); });
};
var updateCustomer = function (req, res, next) {
    var branchNo = req.params.branchNo;
    return Customer_1.default.find({ branchNo: branchNo }).then(function (customer) {
        return customer
            ? customer[0]
                .set(req.body)
                .save()
                .then(function (customer) { return res.status(200).json({ customer: customer }); })
                .catch(function (err) { return res.status(500).json({ err: err }); })
            : res.status(404).json({ message: 'Not found' });
    });
};
exports.default = { createCustomer: createCustomer, getCustomer: getCustomer, getAllCustomer: getAllCustomer, updateCustomer: updateCustomer };
