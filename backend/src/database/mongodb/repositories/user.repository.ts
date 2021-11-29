import * as mongoose from 'mongoose';
import { ObjectId, Schema, Model } from 'mongoose';

export interface User {
	_id: ObjectId;
	name: string;
	email: string;
	username: string;
	location: {
		city: string;
		uf: string;
	};
	logged: boolean;
}

const schema = new Schema<User>({
	name: { type: String, required: true },
	email: { type: String, required: true },
	username: { type: String, required: true },
	location: {
		city: { type: String, required: true },
		uf: { type: String, required: true },
	},
	logged: { type: Boolean, default: false },
});

export class UserRepository {
	private repository: Model<User>;
	constructor() {
		this.repository = mongoose.model('users', schema);
		this.repository.createCollection().then();
	}
	async findOne(options: any): Promise<User> {
		return await this.repository.findOne({ ...options }).lean();
	}
	async findById(id: string): Promise<User> {
		return await this.repository.findById(id).lean();
	}
	async create(user: UserModel) {
		return await this.repository.create(user);
	}
	async update(id: mongoose.Condition<ObjectId> | undefined, options: Object) {
		return this.repository.updateOne({ _id: id }, { $set: options });
	}
}
