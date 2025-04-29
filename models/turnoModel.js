const Sequelize = require("sequelize");
const sequelize = require("../util/database");  


const Turno = sequelize.define('Turno', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,  
  },
  fecha_turno: {
    type: Sequelize.DATE,
    allowNull: false,  
  },
  duracion: {
    type: Sequelize.INTEGER,
    defaultValue: 30, 
  },
  clienteId: {
    type: Sequelize.INTEGER,
    field: 'ClienteId',
    allowNull: false,
    references: {
      model: 'CLIENTE',
      key: 'id'        
    }
  }
}, {
  tableName: 'TURNO', 
  timestamps: false, 
});


module.exports = Turno;
