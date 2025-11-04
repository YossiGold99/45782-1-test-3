"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validation;
function validation(validator) {
    return async function (req, res, next) {
        try {
            req.body = await validator.validateAsync(req.body);
            next();
        }
        catch (e) {
            next({
                status: 422,
                message: e.message
            });
        }
    };
}
