"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importStar(require("express"));
const constants_1 = require("./constants");
const routes_1 = __importDefault(require("./router/routes"));
exports.app = (0, express_1.default)();
const mongoose_1 = __importDefault(require("mongoose"));
exports.app.use((0, express_1.json)()); // for parsing application/json
exports.app.use((0, express_1.urlencoded)({ extended: true })); // for parsing application/x-www-form-
exports.app.use(routes_1.default);
exports.app.get('/', (req, res) => {
    res.send('SERVER IS  WORKING!');
});
start();
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        initApp().then(() => {
            mongoose_1.default.connect(constants_1.MONGO_URL, {
                auth: { username: constants_1.MONGO_USER, password: constants_1.MONGO_PASS },
                autoIndex: true,
                authSource: 'admin',
            }, () => console.log('database connected'));
        });
    });
}
function initApp() {
    return __awaiter(this, void 0, void 0, function* () {
        exports.app.listen(constants_1.LISTEN_PORT, () => {
            return console.log(`App is starting on port ${constants_1.LISTEN_PORT}`);
        });
    });
}
//# sourceMappingURL=app.js.map