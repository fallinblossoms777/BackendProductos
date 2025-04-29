const express = require('express');
const router = express.Router();
const cancelacionController = require('../controllers/cancelacionController'); 

router.get('/', cancelacionController.getCancelaciones); 
router.get('/:id', cancelacionController.getCancelacionById); 
router.post('/', cancelacionController.createCancelacion); 
router.delete('/:id', cancelacionController.deleteCancelacion); 

module.exports = router; 