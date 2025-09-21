import { Router } from 'express';
import { getFlightDetails, listFlights, totalBalance } from '../controllers/flightsController.js';

const router = Router();

router.get('/', listFlights);
router.get('/total-balance', totalBalance);
router.get('/:id', getFlightDetails);

export default router;
