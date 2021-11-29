import * as mongoose from 'mongoose';
import { ObjectId, Schema, Model } from 'mongoose';
import { EventModel, EventType } from '../../../interfaces/event.interface';

export interface Event {
	_id: ObjectId;
	type: string;
	userId: string;
	name: string;
	files: string[];
	description: string;
	coordinates: { lat: number; lng: number };
	shareURI: string;
	createdAt: Date;
}

const schema = new Schema<Event>({
	type: { type: String, default: EventType.INCIDENT },
	userId: { type: String, required: true },
	name: { type: String, required: true },
	files: [{ type: String }],
	description: { type: String, required: true },
	coordinates: {
		lat: { type: Number, required: true },
		lng: { type: Number, required: true },
	},
	shareURI: { type: String, default: '' },
	createdAt: { type: Date, default: new Date() },
});

export class EventRepository {
	private repository: Model<Event>;
	constructor() {
		this.repository = mongoose.model('events', schema);
		this.repository.createCollection().then();
	}
	async find(options: any): Promise<Event> {
		return await this.repository.find(options).lean();
	}
	async findOne(options: any): Promise<Event> {
		return await this.repository.findOne(options).lean();
	}
	async findById(id: string): Promise<Event> {
		return await this.repository.findById(id).lean();
	}
	async create(event: EventModel) {
		return await this.repository.create(event);
	}
	async update(id: mongoose.Condition<ObjectId> | undefined, options: Object) {
		return this.repository.updateOne({ _id: id }, { $set: options });
	}
	async delete(id: mongoose.Condition<ObjectId> | undefined) {
		return this.repository.deleteOne({ _id: id });
	}
}
