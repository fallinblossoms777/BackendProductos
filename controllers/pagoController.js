const Pago = require("../models/pagoModel");
const Turno = require("../models/turnoModel");
const Cliente = require("../models/clienteModel");

const getPagos = async (req, res) => {
    try {
        const pagos = await Pago.findAll(); 
        res.status(200).json(pagos); 
    } catch (error) {
        console.error("Error al obtener los pagos:", error); 
        res.status(500).json({ error: "Error al obtener los pagos" }); 
    }
}

const getPagoById = async (req, res) => {
    const id = req.params.id; 
    try {
        const pago = await Pago.findByPk(id); 
        if (!pago) {
            return res.status(404).json({ error: "Pago no encontrado" }); 
        }
        res.status(200).json(pago); 
    } catch (error) {
        console.error("Error al obtener el pago:", error); 
        res.status(500).json({ error: "Error al obtener el pago" }); 
    }
}

const createPago = async (req, res) => {
    const { clienteId, turnoId, monto, metodo_pago, moneda } = req.body; 

    try {
        
        const cliente = await Cliente.findByPk(clienteId);
        if (!cliente) {
            return res.status(404).json({ error: "Cliente no encontrado" });
        }

        
        const turno = await Turno.findByPk(turnoId);
        if (!turno) {
            return res.status(404).json({ error: "Turno no encontrado" });
        }

        
        const metodosValidos = ['efectivo', 'tarjeta'];
        if (!metodosValidos.includes(metodo_pago)) {
            return res.status(400).json({ 
                error: "El método de pago debe ser 'efectivo' o 'tarjeta'." 
            });
        }

        
        const fechaTurno = new Date(turno.fecha_turno);
        const ahora = new Date();
        MILISEGUNDOS = 1000;
        SEGUNDOS = 60;
        MINUTOS = 60;
        const diferenciaHoras = (fechaTurno - ahora) / (MILISEGUNDOS * SEGUNDOS * MINUTOS); 

        if (metodo_pago === 'efectivo' && diferenciaHoras < 2) {
            return res.status(400).json({ 
                error: "El pago en efectivo debe realizarse al menos 2 horas antes del turno." 
            });
        }

        const monedasValidas = ['local', 'extranjera'];
        if (!monedasValidas.includes(moneda)) {
            return res.status(400).json({ 
                error: "La moneda debe ser 'local' o 'extranjera'." 
            });
        }

        const alquileres = await Alquiler.findAll({ where: { turnoId } });
        let descuento = 0;
        if (alquileres.length > 1) {
            descuento = monto * 0.10; 
        }

        const nuevoPago = await Pago.create({
            clienteId,
            turnoId,
            monto: monto - descuento, 
            metodo_pago,
            moneda,
            fecha_pago: ahora,
        });

        res.status(201).json(nuevoPago); 

    } catch (error) {
        console.error("Error al crear el pago:", error); 
        res.status(500).json({ error: "Error al crear el pago" }); 
    }
};

const updatePago = async (req, res) => {
    const id = req.params.id; 
    const { clienteId, turnoId, monto } = req.body; 
    try {
        const pago = await Pago.findByPk(id); 
        if (!pago) {
            return res.status(404).json({ error: "Pago no encontrado" }); 
        }
        await pago.update({ clienteId, turnoId, monto }); 
        res.status(200).json(pago); 
    } catch (error) {
        console.error("Error al actualizar el pago:", error); 
        res.status(500).json({ error: "Error al actualizar el pago" }); 
    }
}

module.exports = {
    getPagos,
    getPagoById,
    createPago,
    updatePago
}