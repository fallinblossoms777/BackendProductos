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
    try {
      const { clienteId, fecha_turno } = req.body;
  
      const fechaTurno = new Date(fecha_turno);
      const ahora = new Date();
      if (fechaTurno.getTime() - ahora.getTime() > 48 * 60 * 60 * 1000) {
        return res.status(400).json({ message: 'No se puede reservar un turno con más de 48 horas de anticipación.' });
      }
  
      const turnosConsecutivos = await Turno.findAll({
        where: { clienteId },
        order: [['fecha_turno', 'ASC']],
      });

      let maxConsecutivos = 1;
      let consecutivosActuales = 1;
      
      for (let i = 1; i < turnosConsecutivos.length; i++) {
        const anterior = new Date(turnosConsecutivos[i - 1].fecha_turno).getTime();
        const actual = new Date(turnosConsecutivos[i].fecha_turno).getTime();
      
        if (actual - anterior === 30 * 60 * 1000) {
          consecutivosActuales++;
          if (consecutivosActuales > maxConsecutivos) {
            maxConsecutivos = consecutivosActuales;
          }
        } else {
          consecutivosActuales = 1; 
        }
      }
      
      if (maxConsecutivos >= 3) {
        return res.status(400).json({ message: 'No puedes tener más de 3 turnos consecutivos.' });
      }      
  
      const turno = await Turno.create({ clienteId, fecha_turno });
      res.status(201).json(turno);
    } catch (error) {
      console.error('Error al crear el turno:', error);
      res.status(500).json({ message: 'Error al crear el turno.' });
    }
};

module.exports = {
    getTurnos,
    getTurnoById,
    createTurno,
};