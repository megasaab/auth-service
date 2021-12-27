"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKEN_KEY = exports.MONGO_PASS = exports.MONGO_USER = exports.MONGO_URL = exports.LISTEN_PORT = void 0;
// basic variables for starting project
exports.LISTEN_PORT = process.env.LISTEN_PORT || 3000;
exports.MONGO_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/database';
exports.MONGO_USER = process.env.MONGO_USER || 'bpm';
exports.MONGO_PASS = process.env.MONGO_PASS || 'bpm';
exports.TOKEN_KEY = process.env.TOKEN_KEY || 'AA;LDFJAL;T;E;ALSDALdSSpKWE;K;p';
//# sourceMappingURL=constants.js.map