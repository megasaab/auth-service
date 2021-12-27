"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../constants");
const verifyToken = (request, response, next) => {
    const authorizationHeaader = request.headers.authorization;
    let result;
    if (authorizationHeaader) {
        const token = request.headers.authorization.split(' ')[1]; // Bearer <token>
        try {
            // verify makes sure that the token hasn't expired and has been issued by us
            result = jsonwebtoken_1.default.verify(token, constants_1.TOKEN_KEY);
            // Let's pass back the decoded token to the request object
            request.decoded = result;
            // We call next to pass execution to the subsequent middleware
            next();
        }
        catch (err) {
            // Throw an error just in case anything goes wrong with verification
            throw new Error(err);
        }
    }
    else {
        result = {
            error: `Authentication error. Token required.`,
            status: http_status_codes_1.StatusCodes.UNAUTHORIZED
        };
        response.status(401).send(result);
    }
};
exports.authMiddleware = verifyToken;
//# sourceMappingURL=auth.js.map