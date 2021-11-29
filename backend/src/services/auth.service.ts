import {
	User,
	UserRepository,
} from '../database/mongodb/repositories/user.repository';
import { handleError, makeUsername } from '../helpers';
import { Error, HandleListModel } from '../interfaces/error.interface';
export default class AuthService {
	private static userRepository: UserRepository = new UserRepository();

	static async login(username: string, errorsList: Error[]) {
		handleError([
			{
				condition: !username,
				error: 'username',
				errorsList,
			},
		]);
		const user: User = await this.userRepository.findOne({
			username,
		});
		handleError([
			{
				condition: !user,
				error: 'user',
				errorsList: [{ user: [404, 'User not found'] }],
			},
		]);
		await this.userRepository.update(user._id, {
			logged: true,
		});
		return user;
	}

	static async register(user: UserModel, errorsList: Error[]) {
		const handleList: HandleListModel[] = [
			{
				condition: !user.name,
				error: 'name',
				errorsList,
			},
			{
				condition: !user.email,
				error: 'email',
				errorsList,
			},
			{
				condition: !user.location,
				error: 'location',
				errorsList,
			},
		];
		handleError(handleList);
		user.username = makeUsername(user.name, user.location.uf);
		user = await this.userRepository.create(user);
		return user;
	}

	static async logout(id: string) {
		const user: User = await this.userRepository.findById(id);
		handleError([
			{
				condition: !user,
				error: 'user',
				errorsList: [{ user: [404, 'User not found'] }],
			},
		]);
		await this.userRepository.update(user._id, {
			logged: false,
		});
		return user._id;
	}
}
