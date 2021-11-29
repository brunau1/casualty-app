import * as util from 'util';
import * as multer from 'multer';
import * as fs from 'fs';
import { Response } from 'express';
import * as path from 'path';

const maxSize = 2 * 1024 * 1024;
const localPath = path.resolve(__dirname + '../../../../resources/uploads/');
export default class StorageService {
	private static storage = multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, localPath);
		},
		filename: (req, file, cb) => {
			console.log(file.originalname);
			cb(null, file.originalname);
		},
	});

	private static uploadFileMiddleware = multer({
		storage: this.storage,
		limits: { fileSize: maxSize },
	}).single('file');

	static uploadFile = util.promisify(this.uploadFileMiddleware);

	static getListFiles = (baseUrl: string, res: Response) => {
		fs.readdir(localPath, function (err, files) {
			if (err) {
				res.status(500).send({
					message: 'Unable to scan files!',
				});
			}
			const fileInfos: any[] = [];
			files.forEach((file) => {
				fileInfos.push({
					name: file,
					url: baseUrl + file,
				});
			});
			res.status(200).send(fileInfos);
		});
	};

	static download = (fileName: string, res: Response) => {
		res.download(localPath + fileName, fileName, (err) => {
			if (err) {
				res.status(500).send({
					message: 'Could not download the file. ' + err,
				});
			}
		});
	};
}
