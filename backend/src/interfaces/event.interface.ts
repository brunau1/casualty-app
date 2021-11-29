export interface EventModel {
	type?: string;
	userId: string;
	name: string;
	files?: string[];
	description: string;
	coordinates: { lat: number; lng: number };
	shareURI?: string;
	createdAt?: Date;
}
export enum EventType {
	INCIDENT = 'INCIDENT',
}
