const express = require('express');
const router = express.Router();
const alquilerController = require('../controllers/alquilerController'); 

router.get('/', alquilerController.getAlquileres); 
router.get('/:id', alquilerController.getAlquilerById); 
router.post('/', alquilerController.createAlquiler); 

module.exports = router; 
