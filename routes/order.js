import { Router } from 'express';
const router = Router();
import { index, order } from "../controllers/order.js";

router.get('/', index);
router.get('/order/:id', order);

export default router;