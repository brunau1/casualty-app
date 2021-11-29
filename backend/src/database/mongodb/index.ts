import * as mongoose from 'mongoose';
export class Database {
	private static instance: Database | undefined;
	private constructor() {}
	static getInstance() {
		if (!this.instance) this.instance = new Database();
		return this.instance;
	}
	async connect(): Promise<void> {
		const options = {
			autoIndex: false,
			maxPoolSize: 10,
			serverSelectionTimeoutMS: 5000,
			socketTimeoutMS: 45000,
			family: 4,
		};
		const URI = process.env.MONGO_URI + '';

		await mongoose.connect(URI, options);
		console.log('Database connected');

		mongoose.connection.on('error', (err) => {
			console.log('MongoDB Error: ', err);
		});
	}
}
