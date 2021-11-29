import AuthController from './auth.controller';
import { Application, Router } from 'express';

export default function (server: Application) {
	const router = Router();
	const controller = new AuthController();
	router.post('/login', controller.login);
	router.get('/logout', controller.logout);
	router.post('/signup', controller.signup);
	server.use('/auth', router);
}
