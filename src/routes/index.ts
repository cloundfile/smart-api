import { Router } from 'express';
const routes = Router();

import { UsuarioController } from '../controllers/UsuarioController';
import { AuthController } from '../controllers/AuthController';
import { required } from '../middlewares/login';

const authController    = new AuthController();
const usuarioController = new UsuarioController(); 

routes.get('/', authController.status);
routes.post('/api/auth', authController.login);

routes.get('/api/usuarios',  usuarioController.findById);
routes.post('/api/usuarios', usuarioController.create);
routes.get('/api/usuarios',  usuarioController.findall);
routes.put('/api/usuarios',  required, usuarioController.update);
routes.delete('/api/usuarios',required, usuarioController.delete);
routes.get('/api/usuarios/search', usuarioController.findByUsername);

export default routes