import { AppDataSource } from '../data-source'
import { Usuario } from '../domain/Usuario'

export const usuarioRep = AppDataSource.getRepository(Usuario);