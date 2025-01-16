"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = createToken;
exports.verifyToken = verifyToken;
const encoding = process.env.TOKEN_JWT;
const expiresIn = process.env.TOKEN_EXP;
const jwt = require('jsonwebtoken');
function createToken(payload) {
    return jwt.sign(payload, encoding, { expiresIn: expiresIn });
}
function verifyToken(token) {
    return jwt.verify(token, encoding);
}
