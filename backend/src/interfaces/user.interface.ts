interface UserModel {
	name: string;
	email: string;
	username?: string;
	location: {
		city: string;
		uf: string;
	};
}
