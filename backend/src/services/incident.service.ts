import { EventRepository } from '../database/mongodb/repositories/event.repository';
import { EventModel } from '../interfaces/event.interface';

export class IncidentService {
	private static eventRepository: EventRepository = new EventRepository();
	constructor() {}
	static async getIncidents() {
		const incidents = await this.eventRepository.find({ type: 'INCIDENT' });
		return incidents;
	}
	static async getIncident(id: string) {
		const incident = await this.eventRepository.findById(id);
		return incident;
	}
	static async createIncident(incident: EventModel) {
		const newIncident = await this.eventRepository.create(incident);
		return newIncident;
	}
	static async updateIncident(id: string, props: EventModel | Object) {
		const incident = await this.eventRepository.findById(id);
		await this.eventRepository.update(incident._id, props);
		return incident;
	}
	static async deleteIncident(id: string) {
		const incident = await this.eventRepository.findById(id);
		const deletedIncident = await this.eventRepository.delete(incident._id);
		return deletedIncident;
	}
}
