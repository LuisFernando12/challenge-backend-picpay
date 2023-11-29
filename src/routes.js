import { Router } from 'express';
import TransactionController from './controller/TransactionController.js';
import WalletController from './controller/WalletController.js';
import UserController from './controller/UserController.js';

const route = Router();


route.get('/', (req, res) => { res.json({ ping: 'pong' }) })
route.post('/user/', UserController.create)
route.get('/user/', UserController.findAll)
route.get('/user/:id', UserController.get)
route.put('/user/:id', UserController.update)
route.delete('/user/:id', UserController.delete)

route.post('/login', UserController.login)

route.post('/transaction', TransactionController.create);

route.get('/wallet/:id', WalletController.get);
export default route;