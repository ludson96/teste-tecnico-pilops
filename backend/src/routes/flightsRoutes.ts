import { Router } from 'express';
import { listFlights } from '../controllers/flightsController.js';

const router = Router();

router.get('/', listFlights);

export default router;
