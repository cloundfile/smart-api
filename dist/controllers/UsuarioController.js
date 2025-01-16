"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioController = void 0;
const UsuariosRep_1 = require("../repositories/UsuariosRep");
const bcrypt = require('bcryptjs');

class UsuarioController {
    async create(req, res) {        
        const { fullname, email, username, password } = req.body;
        if (!fullname || !email || !username || !password)
            return res.status(400).json({ message: "Campos com * obrigatório." });
        const criptpass = bcrypt.hashSync(password, 10);
        const create = UsuariosRep_1.usuarioRep.create({
            email,
            fullname,
            username,
            password: criptpass
        });
        const usuario = await UsuariosRep_1.usuarioRep.save(create);
        const response = { uuid: usuario.id, username: usuario.username };
        return res.status(201).json(response);
    }

    async findall(req, res) {
        const response = await UsuariosRep_1.usuarioRep.find();
        if (response.length === 0)
            return res.status(200).json({ message: "Nenhum registro encontrado." });
        const usuarios = response.map(item => {
            return {
                id: item.id,
                username: item.username
            };
        });
        return res.json(usuarios);
    }
    async findById(req, res) {
        const { id } = req.query;
        if (!id)
            return res.status(400).json({ message: "ID obrigatório." });
        const usuario = await UsuariosRep_1.usuarioRep.findOneBy({ id: Number(id) });
        if (!usuario)
            return res.status(200).json({ message: "Nenhum registro encontrado." });
        const response = { uuid: usuario.id, username: usuario.username };
        return res.json(response);
    }

    async findByUsername(req, res) {
        const { username } = req.body;
        if (!username)
            return res.status(200).json({ message: "Nenhum registro encontrado." });
        const usuarios = await UsuariosRep_1.usuarioRep.createQueryBuilder('usuario')
            .where('LOWER(usuario.username) LIKE :username', { username: `%${username.toLowerCase()}%` })
            .getMany();
        if (usuarios.length === 0)
            return res.status(200).json({ message: "Nenhum registro encontrado." });
        const response = usuarios.map(item => { return { id: item.id, username: item.username }; });
        return res.json(response);
    }

    async update(req, res) {
        const { id, fullname, email, username, password } = req.body;
        if (!id || !fullname || !email || !username || !password)
            return res.status(400).json({ message: "Campos com * obrigatório." });
        const usuario = await UsuariosRep_1.usuarioRep.findOneBy({ id: Number(id) });
        if (!usuario)
            return res.status(400).json({ message: "Usuário não encontrado." });
        const criptpass = bcrypt.hashSync(password, 10);
        const create = UsuariosRep_1.usuarioRep.create({
            id,
            email,
            fullname,
            username,
            password: criptpass
        });
        await UsuariosRep_1.usuarioRep.update(id, create);
        return res.status(201).json({
            id: create.id,
            username: create.username,
            message: "Atualizado com sucesso!"
        });
    }
    
    async delete(req, res) {
        const { id } = req.body;
        if (!id)
            return res.status(400).json({ message: "ID obrigatório." });
        const usuario = await UsuariosRep_1.usuarioRep.findOneBy({ id: Number(id) });
        if (!usuario)
            return res.status(400).json({ message: "ID não encontrado." });
        await UsuariosRep_1.usuarioRep.delete(id);
        return res.status(201).json({ message: usuario?.username + " Deletado com sucesso." });
    }
}
exports.UsuarioController = UsuarioController;
