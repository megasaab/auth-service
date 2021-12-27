"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth-controller"));
const user_controller_1 = __importDefault(require("../controllers/user-controller"));
const routes = (0, express_1.Router)();
routes.use('/users', user_controller_1.default);
routes.use('/auth', auth_controller_1.default);
exports.default = routes;
//# sourceMappingURL=routes.js.map