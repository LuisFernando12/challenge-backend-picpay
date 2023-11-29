import express, { json } from 'express';
import cors from  'cors'
import route from './src/routes.js'
import connection from './src/config/db/index.js';

const app = express();
connection.on('error', console.log.bind(console, 'Connection error'));

app.use(cors());
app.use(json());
app.use(route);

app.listen(3000, ()=> console.log(`App runing in port: 3000`));