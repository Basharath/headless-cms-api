import app from './app.js';
import http from 'http';

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, () => console.log(`Started listing on ${PORT}`));
