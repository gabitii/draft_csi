import { Router } from 'express';
import { CarPartController } from '../controllers/CarPartController';

const router = Router();
const controller = new CarPartController();

router.get('/', controller.getAll);
router.post('/', controller.create);
router.delete('/clear', controller.clearAll);
router.delete('/:id', controller.delete);
router.get('/export', controller.export);
export default router;
