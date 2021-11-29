import IncidentController from './incidents.controller';
import AuthMiddleware from '../Auth/auth.middleware';
import { Application, Router } from 'express';

export default function (server: Application) {
	const router = Router();
	const controller = new IncidentController();
	router.get('/', AuthMiddleware, controller.getIncidents);
	router.post('/', AuthMiddleware, controller.createIncident);
	router.get('/:id', AuthMiddleware, controller.getIncident);
	router.put('/:id', AuthMiddleware, controller.updateIncident);
	router.delete('/:id', AuthMiddleware, controller.deleteIncident);
	router.post('/files', AuthMiddleware, controller.uploadFile);
	router.get('/files', AuthMiddleware, controller.getListFiles);
	router.get('/files/:file', AuthMiddleware, controller.downloadFile);
	server.use('/incidents', AuthMiddleware, router);
}
