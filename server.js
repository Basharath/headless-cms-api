import http from 'http';
import app from './app.js';

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

// eslint-disable-next-line no-console
server.listen(PORT, () => console.log(`Started listing on ${PORT}`));
