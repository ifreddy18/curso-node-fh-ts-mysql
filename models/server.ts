import express, { Application } from 'express';
import usersRoutes from '../routes/users.routes';
import cors from 'cors';
import db from '../db/connection';

class Server {

    private app: Application; // express.Aplication
    private port: string;
    private apiPath = {
        users: '/api/users'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';

        // Métodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();

    }

    async dbConnection() {

        try {

            await db.authenticate();
            console.log('Database online');

        } catch (error: any) {
            throw new Error( error );
        }

    }

    middlewares(): void {

        // CORS
        this.app.use( cors() );

        // Lectura del body
        this.app.use( express.json() );

        // Carpeta 'public'
        this.app.use( express.static('public') );

    }

    routes(): void {
        this.app.use( this.apiPath.users, usersRoutes );
    }

    listen(): void {
        this.app.listen( this.port, () => {
            console.log('Working on port:', this.port);
        });
    }

}

export default Server;
