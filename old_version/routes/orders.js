import { Router } from 'express';
const router = Router();
import { index as kitchenIndex, order as kitchenOrder } from "../controllers/kitchen.js";
import { index as BarIndex, order as BarOrder } from "../controllers/bar.js";

router.get('/kitchen', kitchenIndex);
router.get('/kitchen/order/:id', kitchenOrder);
router.get('/bar', BarIndex);
router.get('/bar/order/:id', BarOrder);

export default router;