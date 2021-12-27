"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersRouter = (0, express_1.Router)();
usersRouter.get('/all', (request, response) => {
    return response.json("OK");
});
exports.default = usersRouter;
//# sourceMappingURL=user-route.js.map