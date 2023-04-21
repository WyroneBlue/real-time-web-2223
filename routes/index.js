import { Router } from 'express';
const router = Router();

import home from './home.js';
import order from './order.js';

router.use('/', home);
router.use('/orders', order);

export default router;