const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        // Conexión a base de datos
        this.connectDB();

        // Middlewares
        this.middlewares();

        // Rutas
        this.routes();

    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usersPath, require('../routes/user'));
    }

    listen() {

        this.app.listen(this.port, () => {
            console.log('Escuchando en el puerto', this.port);
        }); 

    }
       
}


module.exports = Server;
