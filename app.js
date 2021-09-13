import express from 'express';

const app = express();

app.get('/', (req, res) => res.send('Welcome from the Headless CMS'));

export default app;
