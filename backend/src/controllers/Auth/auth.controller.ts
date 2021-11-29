import { Request, Response } from 'express';
import { Error } from '../../interfaces/error.interface';
import AuthService from '../../services/auth.service';
export default class AuthController {
	constructor() {}
	async login(req: Request, res: Response) {
		try {
			const { username } = req.body;
			const errors: Error[] = [{ username: [400, 'Missing username'] }];
			const user = await AuthService.login(username, errors);
			return res.status(201).send({ message: 'ok', user });
		} catch (error: any) {
			console.log(error);
			return res.status(error.status).send({ message: error.message });
		}
	}
	async logout(req: Request, res: Response) {
		const { id } = req.headers;
		await AuthService.logout(id + '');
		return res.status(201).send({ message: 'ok' });
	}
	async signup(req: Request, res: Response) {
		try {
			const errors: Error[] = [
				{ name: [400, 'Missing name'] },
				{ email: [400, 'Missing email'] },
				{ city: [400, 'Missing city'] },
				{ uf: [400, 'Missing uf'] },
			];
			const user = await AuthService.register(req.body, errors);
			return res.status(201).send({ message: 'ok', user });
		} catch (error: any) {
			console.log(error);
			return res.status(error.status).send({ message: error.message });
		}
	}
}
