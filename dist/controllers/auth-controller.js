"use strict";
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
const express_1 = require("express");
const user_1 = require("../model/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_codes_1 = require("http-status-codes");
const constants_1 = require("../constants");
const authRouter = (0, express_1.Router)();
authRouter.post('/register', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password } = request.body;
        // Validate user input
        if (!(email && password && firstName && lastName)) {
            return response.status(http_status_codes_1.StatusCodes.OK).send((0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE));
        }
        // Check if user exist in database
        const existsUser = yield user_1.USER.findOne({ email });
        if (existsUser) {
            return response.status(http_status_codes_1.StatusCodes.CONFLICT).send("User Already Exist. Please Login");
        }
        //Encrypt user password
        const encryptedPassword = yield bcryptjs_1.default.hash(password, 10);
        // Create user in our database
        const user = yield user_1.USER.create({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });
        const token = jsonwebtoken_1.default.sign({ user_id: user._id, email }, constants_1.TOKEN_KEY, {
            expiresIn: "2h",
        });
        // save user token
        user.token = token;
        // return new user
        return response.status(http_status_codes_1.StatusCodes.CREATED).json(user);
    }
    catch (error) {
        console.log(error);
    }
}));
authRouter.post('/login', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get user input
        const { email, password } = request.body;
        // Validate user input
        if (!(email && password)) {
            return response.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send((0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        // Validate if user exist in our database
        const user = yield user_1.USER.findOne({ email });
        if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
            // Create token
            const token = jsonwebtoken_1.default.sign({ user_id: user._id, email }, constants_1.TOKEN_KEY, {
                expiresIn: "2h",
            });
            // save user token
            user.token = token;
            // user
            return response.status(200).json(user);
        }
        return response.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send("Invalid Credentials");
    }
    catch (err) {
        console.log(err);
    }
}));
exports.default = authRouter;
//# sourceMappingURL=auth-controller.js.map