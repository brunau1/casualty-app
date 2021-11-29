require('dotenv').config();
import Server from './src/server';
const port = 3001;

new Server(port).start();
