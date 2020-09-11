"use strict";
exports.__esModule = true;
function EntityNotFoundError(_a) {
    var message = _a.message, stack = _a.stack;
    this.code = 'ER_ENTITY_NOT_FOUND';
    this.name = 'EntityNotFoundError';
    this.message = (message || '');
    this.stack = stack;
}
exports.EntityNotFoundError = EntityNotFoundError;
EntityNotFoundError.prototype = Error.prototype;
function entityNotFoundError(modelName, id, column) {
    var error = new Error("\"" + modelName + "\" entity with \"" + column + "\" of \"" + id + "\" was not found");
    return new EntityNotFoundError(error);
}
exports.entityNotFoundError = entityNotFoundError;
