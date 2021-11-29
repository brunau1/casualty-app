import { Request, Response } from 'express';
import { Error } from '../../interfaces/error.interface';
import { IncidentService } from '../../services/incident.service';
import StorageService from '../../services/storage.service';
export default class IncidentController {
	constructor() {}
	async getIncidents(req: Request, res: Response) {
		try {
			const incidents = await IncidentService.getIncidents();
			res.status(200).send({
				success: true,
				incidents,
			});
		} catch (error: any) {
			res.status(400).send({
				success: false,
				error: error.message,
			});
		}
	}
	async getIncident(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const incident = await IncidentService.getIncident(id);
			res.status(200).send({
				success: true,
				incident,
			});
		} catch (error: any) {
			return res.status(500).send({ message: error.message });
		}
	}
	async createIncident(req: Request, res: Response) {
		try {
			req.body.userId = req.headers.authorization;
			const incident = await IncidentService.createIncident(req.body);
			res.status(201).send({
				success: true,
				incident,
			});
		} catch (error: any) {
			console.log(error);
			return res.status(500).send({ message: error.message });
		}
	}
	async updateIncident(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const incident = await IncidentService.updateIncident(id, req.body);
			res.status(200).send({
				success: true,
				incident,
			});
		} catch (error: any) {
			return res.status(500).send({ message: error.message });
		}
	}
	async deleteIncident(req: Request, res: Response) {
		try {
			const { id } = req.params;
			await IncidentService.deleteIncident(id);
			res.status(200).send({
				success: true,
			});
		} catch (error: any) {
			return res.status(500).send({ message: error.message });
		}
	}
	async uploadFile(req: Request, res: Response) {
		try {
			await StorageService.uploadFile(req, res);
			const incident = await IncidentService.getIncident(
				req.headers.incidentid + ''
			);
			if (req.file) {
				incident.files.push(req.file.originalname);
				await IncidentService.updateIncident(req.headers.incidentid + '', {
					files: incident.files,
				});
			}
			return res.status(200).send({
				message: 'Uploaded the file successfully',
			});
		} catch (error: any) {
			if (error.code == 'LIMIT_FILE_SIZE') {
				return res.status(500).send({
					message: 'File size cannot be larger than 2MB!',
				});
			}
			return res.status(500).send({
				message: `Could not upload the file: ${error}`,
			});
		}
	}

	async getListFiles(req: Request, res: Response) {
		StorageService.getListFiles(req.baseUrl, res);
	}

	async downloadFile(req: Request, res: Response) {
		const { file } = req.params;
		StorageService.download(file, res);
	}
}
