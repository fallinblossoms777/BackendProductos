const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

router.get('/', productoController.getProductos); 
router.post('/', productoController.createProducto); 

router.route("/:id")    
    .get(productoController.getProductoById) 
    .put(productoController.updateProducto) 
    .delete(productoController.deleteProducto); 

module.exports = router;