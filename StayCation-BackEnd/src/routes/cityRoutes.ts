import { Router } from 'express';
import { getAllCities, getCityById, createCity, updateCity, deleteCity } from '../controllers/cityController';

const router = Router();

router.get('/', getAllCities);
router.get('/:id', getCityById);
router.post('/', createCity);
router.put('/:id', updateCity);
router.delete('/:id', deleteCity);

export default router;