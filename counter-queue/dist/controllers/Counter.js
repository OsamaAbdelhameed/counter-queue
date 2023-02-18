"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Counter_1 = __importDefault(require("../models/Counter"));
var createCounter = function (req, res, next) {
    var _a = req.body, num = _a.num, name = _a.name, status = _a.status, current = _a.current, history = _a.history;
    var counter = new Counter_1.default({
        num: num,
        name: name,
        status: status,
        current: current,
        history: history
    });
    return counter
        .save()
        .then(function (Counter) { return res.status(200).json({ Counter: Counter }); })
        .catch(function (err) { return res.status(500).json({ err: err }); });
};
var getCounter = function (req, res, next) {
    var num = req.params.num;
    return Counter_1.default.find({ num: num }).limit(1)
        .then(function (Counter) { return (Counter ? res.status(200).json({ Counter: Counter }) : res.status(404).json({ message: 'Not found' })); })
        .catch(function (err) { return res.status(500).json({ err: err }); });
};
var getAllCounter = function (req, res, next) {
    return Counter_1.default.find()
        .then(function (Counters) { return res.status(200).json({ Counters: Counters }); })
        .catch(function (err) { return res.status(500).json({ err: err }); });
};
var updateCounter = function (req, res, next) {
    var num = req.params.num;
    return Counter_1.default.find({ num: num }).then(function (counter) {
        return counter
            ? counter[0]
                .set(req.body)
                .save()
                .then(function (Counter) { return res.status(200).json({ Counter: Counter }); })
                .catch(function (err) { return res.status(500).json({ err: err }); })
            : res.status(404).json({ message: 'Not found' });
    });
};
exports.default = { createCounter: createCounter, getCounter: getCounter, getAllCounter: getAllCounter, updateCounter: updateCounter };
