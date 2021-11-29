import api from './api';

class UploadFilesService {
	upload(file, incidentId) {
		let formData = new FormData();
		formData.append('file', file);
		return api.post('incidents/files', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
				authorization: localStorage.getItem('userId'),
				incidentId,
			},
		});
	}

	getFiles(incidentId) {
		return api.get('/files', {
			headers: {
				authorization: localStorage.getItem('userId'),
				incidentId,
			},
		});
	}
}

export default new UploadFilesService();
