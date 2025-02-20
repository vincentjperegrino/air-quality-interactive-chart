"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const data_1 = __importDefault(require("../controllers/data"));
const router = (0, express_1.Router)();
router.get('/parameters', data_1.default.getAvailableParameters);
router.get('/', data_1.default.getData);
exports.default = router;
