import express from 'express';
import UserController from './controllers/UserController';
import redis from './lib/cache';
import swaggerUi from 'swagger-ui-express';

import swaggerFile from "../src/swagger.json";

import bodyParser from 'body-parser'

const app = express();

app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get('/', (req, res) => res.send("Its working"));

app.get('/users', UserController.find);

app.post('/users', UserController.create);

app.get('/clear-cache', async (req, res) => {

    await redis.del("users:all");
    
    console.log('cache clean')

    res.json({
        ok: "user cache is clean!",
    });

});

app.listen(3000);