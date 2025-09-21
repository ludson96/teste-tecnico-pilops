import { Router } from 'express';
import { getFlightDetails, listFlights } from '../controllers/flightsController.js';

const router = Router();

router.get('/', listFlights);
router.get('/:id', getFlightDetails);

export default router;
