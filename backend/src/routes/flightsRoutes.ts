import { Router } from 'express';
import { listFlights } from '../controllers/flightsController';

const router = Router();

router.get('/', listFlights);

export default router;
