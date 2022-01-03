import dotenv from 'dotenv'
import Server from './models/server';

// Configurar dotenv
dotenv.config();

// Inicialización del servidor
const server = new Server();

server.listen();