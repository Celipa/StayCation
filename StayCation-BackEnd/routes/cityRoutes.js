const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');

router.post('/cities', cityController.createCity);
router.get('/cities', cityController.getAllCities);
router.get('/cities/:id', cityController.getCityById);
router.put('/cities/:id', cityController.updateCity);

module.exports = router;