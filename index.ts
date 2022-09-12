import express from 'express';
import UserController from './controllers/user';

const app = express();

const userController = new UserController();

app.get('/users', userController.getAll);
app.get('/users/:id', userController.getById);

app.listen(8080, () => console.log('Online'));