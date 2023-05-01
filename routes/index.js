import { Router } from 'express';
const router = Router();

import home from './home.js';
import orders from './orders.js';

router.use('/', home);
router.use('/orders', orders);

export default router;