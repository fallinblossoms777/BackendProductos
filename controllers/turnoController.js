const Turno = require("../models/turnoModel");

const getTurnos = async (req, res) => {
    try {
        const turnos = await Turno.findAll(); 
        res.status(200).json(turnos); 
    } catch (error) {
        console.error("Error al obtener los turnos:", error); 
        res.status(500).json({ error: "Error al obtener los turnos" }); 
    }
}

const getTurnoById = async (req, res) => {
    const id = req.params.id; 
    try {
        const turno = await Turno.findByPk(id); 
        if (!turno) {
            return res.status(404).json({ error: "Turno no encontrado" }); 
        }
        res.status(200).json(turno); 
    } catch (error) {
        console.error("Error al obtener el turno:", error);
        res.status(500).json({ error: "Error al obtener el turno" }); 
    }
}

const createTurno = async (req, res) => {
    const { clienteId, fecha_turno } = req.body; 

    try {
        const ahora = new Date(); 
        const fechaTurno = new Date(fecha_turno); 

        const milisegundosPorSegundo = 1000;
        const segundosPorMinuto = 60;
        const minutosPorHora = 60;
        const horasLimite = 48;

        const limiteEnMilisegundos = horasLimite * minutosPorHora * segundosPorMinuto * milisegundosPorSegundo;

        if ((fechaTurno.getTime() - ahora.getTime()) > limiteEnMilisegundos) {
            return res.status(400).json({ 
                message: "No se puede reservar un turno con más de 48 horas de anticipación." 
            });
        }

        const turnosCliente = await Turno.findAll({
            where: { clienteId }
        });

        const turnosFechas = turnosCliente.map(t => new Date(t.fecha_turno).getTime());
        turnosFechas.push(fechaTurno.getTime());
        turnosFechas.sort((a, b) => a - b); 

        let maxConsecutivos = 1;
        let consecutivosActuales = 1;

        for (let i = 1; i < turnosFechas.length; i++) {
            const milisegundosPorSegundo = 1000;
            const segundosPorMinuto = 60;
            const minutosPorMediaHora = 30;

            const duracionTurnoEnMilisegundos = minutosPorMediaHora * segundosPorMinuto * milisegundosPorSegundo;
            if (turnosFechas[i] - turnosFechas[i - 1] === duracionTurnoEnMilisegundos) {
                consecutivosActuales++; 
                if (consecutivosActuales > maxConsecutivos) {
                    maxConsecutivos = consecutivosActuales; 
                }
            } else {
                consecutivosActuales = 1; 
            }
        }

        if (maxConsecutivos > 3) {
            return res.status(400).json({ message: "No puedes tener más de 3 turnos consecutivos." });
        }

        const nuevoTurno = await Turno.create({ clienteId, fecha_turno }); 
        res.status(201).json(nuevoTurno); 

    } catch (error) {
        console.error("Error al crear el turno:", error); 
        res.status(500).json({ message: "Error al crear el turno." }); 
    }
};

module.exports = {
    getTurnos,
    getTurnoById,
    createTurno,
};
