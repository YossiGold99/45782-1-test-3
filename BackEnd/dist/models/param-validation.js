"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = paramValidation;
function paramValidation(validator) {
    return async function (req, res, next) {
        try {
            req.params = await validator.validateAsync(req.params);
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
