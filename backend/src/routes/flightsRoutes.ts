// src/routes/flightsRoutes.ts
import { Router } from 'express';
import { listFlights } from '../controllers/flightsController';

const router = Router();

router.get('/flights', listFlights);

export default router;
