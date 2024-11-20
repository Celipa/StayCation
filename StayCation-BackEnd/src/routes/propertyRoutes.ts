import express from 'express';
import { getAllProperties, getPropertyById, createProperty, updateProperty, deleteProperty } from '../src/controllers/propertyController';

const router = express.Router();

router.get('/', getAllProperties);
router.get('/:id', getPropertyById);
router.post('/', createProperty);
router.put('/:id', updateProperty);
router.delete('/:id', deleteProperty);

export default router;