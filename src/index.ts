import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { seed } from './infrastructure/seeds';
import mainRouter from './routers/zindex';
import * as express from 'express';
const app = express();

createConnection()
    .then(async (connection) => {
        await connection.runMigrations();
        await seed(connection);
        // start server
        app.use(express.json());
        app.use('/api', mainRouter);
        app.listen(8080, () => console.log('server running on port 8080'));
    })
    .catch((error) => console.log(error));
