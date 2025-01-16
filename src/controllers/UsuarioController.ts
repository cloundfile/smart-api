import { usuarioRep } from '../repositories/UsuariosRep';
import { Request, Response } from 'express';
const bcrypt = require('bcryptjs');

export class UsuarioController {
    async create(req: Request, res: Response) {
        const { fullname, email, username, password } = req.body
        if( !fullname || ! email || !username || !password ) return res.status(400).json({ message: "Campos com * obrigatório."});
        const criptpass = bcrypt.hashSync(password, 10);
        const create = usuarioRep.create({
            email,
            fullname,
            username,
            password: criptpass
        })
        const usuario  = await usuarioRep.save(create);
        const response = { uuid: usuario.id, username: usuario.username };
        return res.status(201).json(response);
    }
   
    async findall(req: Request, res: Response) {
		const response = await usuarioRep.find()   
        if(response.length === 0) return res.status(200).json({ message: "Nenhum registro encontrado."}); 
        const usuarios = response.map(item => { 
           return { 
                id: item.id, 
                username: item.username 
            }
        })
		return res.json(usuarios);
	}

    async findById(req: Request, res: Response) {
        const { id } = req.query
        if( !id ) return res.status(400).json({ message: "ID obrigatório."})

		const usuario = await usuarioRep.findOneBy({ id: Number(id) })       
        if(!usuario) return res.status(200).json({ message: "Nenhum registro encontrado."});
        const response = { uuid: usuario.id, username: usuario.username };
		return res.json(response);
	}

    async findByUsername(req: Request, res: Response) {
        const { username } = req.body
        if( !username ) return res.status(200).json({ message: "Nenhum registro encontrado."});
        
		const usuarios = await usuarioRep.createQueryBuilder('usuario')
            .where('LOWER(usuario.username) LIKE :username', { username: `%${username.toLowerCase()}%` })
            .getMany();

        if(usuarios.length === 0) return res.status(200).json({ message: "Nenhum registro encontrado."});
		const response = usuarios.map(item => {  return { id: item.id, username: item.username }});
		return res.json(response);
	}

    async update(req: Request, res: Response) {
        const { id, fullname, email, username, password } = req.body;
        if( !id || !fullname || !email || !username || !password ) return res.status(400).json({ message: "Campos com * obrigatório."});
        
        const usuario = await usuarioRep.findOneBy({id: Number(id)});
        if(!usuario) return res.status(400).json({ message: "Usuário não encontrado."});
        
        const criptpass = bcrypt.hashSync(password, 10);
        const create =  usuarioRep.create({
            id,
            email,
            fullname,
            username,
            password: criptpass
        })
        
        await usuarioRep.update(id, create);
        return res.status(201).json({
           id: create.id,
           username: create.username,
           message: "Atualizado com sucesso!"
        });
    }

    async delete(req: Request, res: Response) {
        const { id } = req.body;
        if( !id ) return res.status(400).json({ message: "ID obrigatório."});   

        const usuario = await usuarioRep.findOneBy({id: Number(id)});        
        if(!usuario) return res.status(400).json({ message: "ID não encontrado."});

        await usuarioRep.delete(id);
        return res.status(201).json({ message: usuario?.username + " Deletado com sucesso."});
    }
}