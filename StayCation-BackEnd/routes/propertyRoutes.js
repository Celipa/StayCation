const express = require('express');
const router = express.Router();
const {
    getAllProperties, 
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty
} = require('../controllers/propertyController');

router.get('/properties', getAllProperties); 
router.get('/properties/:id', getPropertyById);
router.post('/properties', createProperty);
router.put('/properties/:id', updateProperty);
router.delete('/properties/:id', deleteProperty);

module.exports = router;
// const express = require('express');
// const router = express.Router();
// const {
//     getAllProperties, 
//     getPropertyById,
//     createProperty,
//     updateProperty,
//     deleteProperty
// } = require('../controllers/propertyController');

// router.get('/properties', getAllProperties); 
// router.get('/properties/:id', getPropertyById);
// router.post('/properties', createProperty);
// router.put('/properties/:id', updateProperty);
// router.delete('/properties/:id', deleteProperty);

// module.exports = router;