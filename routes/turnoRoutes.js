const express = require('express');
const router = express.Router();
const turnoController = require('../controllers/turnoController'); 

router.get('/', turnoController.getTurnos); 
router.post('/', turnoController.createTurno);
router.get('/:id', turnoController.getTurnoById); 

module.exports = router; 