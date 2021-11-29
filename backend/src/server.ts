import * as express from 'express';
import * as cors from 'cors';
import { Database } from './database/mongodb';
import AuthRouter from './controllers/Auth';
import IncidentsRouter from './controllers/Incidents';

export default class Server {
	public app: express.Application;
	private port: number;
	constructor(port: number) {
		this.port = port;
		this.app = express();
		this.config();
		this.routes();
	}

	private config() {
		this.app.use(express.json());
		this.app.use(express.json());
		this.app.use(cors());
		const instance = Database.getInstance();
		instance.connect();
	}

	private routes() {
		this.app.get('/', (req, res) => {
			res.send('Hello World!');
		});
		AuthRouter(this.app);
		IncidentsRouter(this.app);
	}

	start() {
		this.app.listen(this.port, () => {
			console.log(`App listening at http://localhost:${this.port}`);
		});
	}
}
