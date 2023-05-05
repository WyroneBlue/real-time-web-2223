import { Router } from 'express';
const router = Router();
import { index } from "../controllers/home.js";

router.get('/', index);

export default router;