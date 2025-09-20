import express from 'express';
import flightsRoutes from './routes/flightsRoutes';

const app = express();

app.use(express.json());

app.use('/flights', flightsRoutes);

export default app;