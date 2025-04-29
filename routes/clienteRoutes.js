const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController'); 

router.get('/', clienteController.getClientes); 
router.post('/', clienteController.createCliente); 

router.route("/:id")
    .get(clienteController.getClienteById) 
    .put(clienteController.updateCliente) 
    .delete(clienteController.deleteCliente); 

module.exports = router; 