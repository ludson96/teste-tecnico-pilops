import express from 'express';
import cors from 'cors';
import flightsRoutes from './routes/flightsRoutes.js';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/flights', flightsRoutes);

export default app;