import { HandleListModel } from '../interfaces/error.interface';
import { Error } from '../interfaces/error.interface';

export function handleError(handleList: HandleListModel[]) {
	for (const current of handleList)
		if (current.condition) {
			let error: Error = {};
			current.errorsList.map((item) => {
				const [key] = Object.keys(item);
				if (key == current.error) error = item;
			});
			throw {
				status: error[current.error][0],
				message: error[current.error][1],
			};
		}
}
export function makeUsername(name: string, uf: string) {
	const username =
		name
			.split(' ')
			.map((item) => item.toLowerCase())
			.join('-') +
		'-' +
		uf.toLowerCase() +
		Math.floor(Math.random() * 101);
	return username.normalize('NFD').replace(/\p{Diacritic}/gu, '');
}
