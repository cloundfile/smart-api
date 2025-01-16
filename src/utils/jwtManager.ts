const encoding = process.env.TOKEN_JWT;
const expiresIn = process.env.TOKEN_EXP;
const jwt = require('jsonwebtoken');

type jwtClient = {
	id: Number,
    username: string
}

export function createToken(payload: jwtClient){
	return jwt.sign(payload, encoding, { expiresIn: expiresIn })
}

export function verifyToken(token: string): jwtClient{
	return jwt.verify(token, encoding) as jwtClient
}