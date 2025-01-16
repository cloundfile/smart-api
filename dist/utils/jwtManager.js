"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = createToken;
exports.verifyToken = verifyToken;
const encoding = '31990dbc-458d-4441-b279-5da3a75fd76e';
const expiresIn = '24h';
const jwt = require('jsonwebtoken');
function createToken(payload) {
    return jwt.sign(payload, encoding, { expiresIn: expiresIn });
}
function verifyToken(token) {
    return jwt.verify(token, encoding);
}
