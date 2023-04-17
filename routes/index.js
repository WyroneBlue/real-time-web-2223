import { Router } from 'express';
const router = Router();

import home from './home.js';

router.use('/', home);

export default router;