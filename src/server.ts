import http from 'http';
import app from './app';

const PORT = process.env.PORT || 8080;

const server = http.createServer(app);

// eslint-disable-next-line no-console
server.listen(PORT, () => console.log(`Started listing on ${PORT}`));
