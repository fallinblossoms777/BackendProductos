const Alquiler = require('../models/alquilerModel');
const Producto = require('../models/productoModel'); 
const Turno = require('../models/turnoModel'); 

const getAlquileres = async (req, res) => {
    try {
        const alquileres = await Alquiler.findAll(); 
        res.status(200).json(alquileres); 
    } catch (error) {
        console.error("Error al obtener los alquileres:", error); 
        res.status(500).json({ error: "Error al obtener los alquileres" }); 
    }
}

const getAlquilerById = async (req, res) => {
    const id = req.params.id; 
    try {
        const alquiler = await Alquiler.findByPk(id); 
        if (!alquiler) {
            return res.status(404).json({ error: "Alquiler no encontrado" }); 
        }
        res.status(200).json(alquiler); 
    } catch (error) {
        console.error("Error al obtener el alquiler:", error); 
        res.status(500).json({ error: "Error al obtener el alquiler" }); 
    }
}


const createAlquiler = async (req, res) => {
    const { productoId, turnoId, casco, chaleco_salvavidas } = req.body;

    try {
        const producto = await Producto.findByPk(productoId);
    
        if (!producto) {
            return res.status(400).json({ error: "Producto no encontrado" });
        }

        const turno = await Turno.findByPk(turnoId);
        if (!turno) {
            return res.status(400).json({ error: "Turno no encontrado" });
        }

        const tipoProducto = producto.tipo;
        
        if ((tipoProducto === 'JetSky' || tipoProducto === 'Cuatriciclo')) {

            if (casco > 2 || chaleco_salvavidas > 2) {
                return res.status(400).json({ error: "No se pueden alquilar más de 2 dispositivos de seguridad." });
            }
        }
    
        const nuevoAlquiler = await Alquiler.create({
            productoId,
            turnoId,
            casco,
            chaleco_salvavidas
        });
    
        res.status(201).json(nuevoAlquiler);
    
    } catch (error) {
        console.error("Error al crear el alquiler:", error);
        res.status(500).json({ error: "Error al crear el alquiler" });
    }
};

module.exports = {
    getAlquileres,
    getAlquilerById,
    createAlquiler,
};