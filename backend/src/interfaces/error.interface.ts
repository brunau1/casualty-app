export interface ErrorModel {
	status: number;
	message: string;
}
export interface Error {
	[key: string]: [number, string];
}
export interface HandleListModel {
	condition: boolean;
	error: string;
	errorsList: Error[];
}
