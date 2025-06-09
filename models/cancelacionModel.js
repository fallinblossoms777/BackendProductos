const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Cancelacion = sequelize.define('Cancelacion', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fecha_cancelacion: {
    type: Sequelize.DATE,
    allowNull: false
  },
  cancelacion_tormenta: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,  
    allowNull: false,  
  },
    monto_devolucion: {
    type: Sequelize.FLOAT,
    defaultValue: 0           
  },
  turnoId: {  
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'TURNO', 
      key: 'id'       
    }
  }
}, {
  tableName: 'CANCELACION',
  timestamps: false
});

module.exports = Cancelacion;
