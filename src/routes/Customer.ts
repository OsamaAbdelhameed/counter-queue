import express from 'express';
import controller from '../controllers/Customer';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/create', ValidateSchema(Schemas.customer.create), controller.createCustomer);
router.get('/get/:branchNo', controller.getCustomer);
router.get('/get', controller.getAllCustomer);
router.patch('/update/:branchNo', ValidateSchema(Schemas.customer.update), controller.updateCustomer);

export = router;
