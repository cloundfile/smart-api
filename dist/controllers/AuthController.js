"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const UsuariosRep_1 = require("../repositories/UsuariosRep");
const jwtManager_1 = require("../utils/jwtManager");
const bcrypt = require('bcryptjs');
class AuthController {
    async login(req, res) {
        const { username, password } = req.body;
        if (!username || !password)
            return res.status(401).send({ message: 'Username and Password obrigatório.' });
        const create = UsuariosRep_1.usuarioRep.create({
            username,
            password
        });
        const usuario = await UsuariosRep_1.usuarioRep.findOneBy({ username: String(create.username) });
        if (!usuario)
            return res.status(403).json({ message: 'Não autorizado: username or password incorretos.' });
        if (username) {
            const use_password = create.username ? create.password : '';
            const dba_password = usuario?.password;
            const authenticated = await bcrypt.compare(use_password, dba_password);
            if (!authenticated)
                return res.status(403).json({ message: 'Não autorizado: username or password incorretos.' });
            const token = (0, jwtManager_1.createToken)({ id: usuario.id, username: usuario.username });
            return res.status(200).json({ id: usuario.id, token: token });
        }
    }
    async status(req, res) {
        res.json('api is running');
    }
}
exports.AuthController = AuthController;
