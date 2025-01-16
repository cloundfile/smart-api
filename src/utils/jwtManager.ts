const encoding = '31990dbc-458d-4441-b279-5da3a75fd76e';
const expiresIn = '24h';
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