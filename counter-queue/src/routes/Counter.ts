import express from 'express';
import controller from '../controllers/Counter';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/create', ValidateSchema(Schemas.counter.create), controller.createCounter);
router.get('/get/:num', controller.getCounter);
router.get('/get', controller.getAllCounter);
router.patch('/update/:num', ValidateSchema(Schemas.counter.update), controller.updateCounter);

export = router;
