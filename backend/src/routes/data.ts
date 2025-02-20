import { Router } from 'express';
import DataController from '../controllers/data';

const router = Router();

router.get('/parameters', DataController.getAvailableParameters);
router.get('/', DataController.getData);

export default router;