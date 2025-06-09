const Cancelacion = require("../models/cancelacionModel"); 
const Turno = require("../models/turnoModel"); 
const Pago = require("../models/pagoModel");

const getCancelaciones = async (req, res) => {
    try {
        const cancelaciones = await Cancelacion.findAll(); 
        res.status(200).json(cancelaciones); 
    } catch (error) {
        console.error("Error al obtener las cancelaciones:", error); 
        res.status(500).json({ error: "Error al obtener las cancelaciones" }); 
    }
}

const getCancelacionById = async (req, res) => {
    const id = req.params.id; 
    try {
        const cancelacion = await Cancelacion.findByPk(id); 
        if (!cancelacion) {
            return res.status(404).json({ error: "Cancelacion no encontrada" }); 
        }
        res.status(200).json(cancelacion); 
    } catch (error) {
        console.error("Error al obtener la cancelacion:", error); 
        res.status(500).json({ error: "Error al obtener la cancelacion" }); 
    }
}

const createCancelacion = async (req, res) => {
    const { turnoId, fecha_cancelacion, cancelacion_tormenta } = req.body;

    try {
        
        const turno = await Turno.findByPk(turnoId);
        if (!turno) {
            return res.status(404).json({ error: "Turno no encontrado" });
        }

        const fechaTurno = new Date(turno.fecha_turno);
        const fechaCancelacion = new Date(fecha_cancelacion);

        const diferenciaHoras = (fechaTurno - fechaCancelacion) / (1000 * 60 * 60); 

        if (diferenciaHoras < 2 && !cancelacion_tormenta) {
            return res.status(400).json({ 
                error: "La cancelación debe realizarse al menos 2 horas antes del turno para evitar costos." 
            });
        }
        
        const nuevaCancelacion = await Cancelacion.create({
            turnoId,
            fecha_cancelacion,
            cancelacion_tormenta
        });
        
        if (cancelacion_tormenta) {
            return res.status(201).json({ 
                mensaje: "Cancelación por tormenta: se devuelve el 50% del valor abonado.",
                cancelacion: nuevaCancelacion 
            });
        }

        res.status(201).json(nuevaCancelacion);

    } catch (error) {
        console.error("Error al crear la cancelación:", error);
        res.status(500).json({ error: "Error al crear la cancelación" });
    }
}

const deleteCancelacion = async (req, res) => {
    const id = req.params.id; 
    try {
        const cancelacion = await Cancelacion.findByPk(id); 
        if (!cancelacion) {
            return res.status(404).json({ error: "Cancelacion no encontrada" }); 
        }
        await cancelacion.destroy(); 
        res.status(204).send(); 
    } catch (error) {
        console.error("Error al eliminar la cancelacion:", error); 
        res.status(500).json({ error: "Error al eliminar la cancelacion" }); 
    }
}

module.exports = {
    getCancelaciones,
    getCancelacionById,
    createCancelacion,
    deleteCancelacion
};
