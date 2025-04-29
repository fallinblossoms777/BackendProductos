const Sequelize = require("sequelize");
const sequelize = require("../util/database");  

const Alquiler = sequelize.define('Alquiler', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  casco: {
    type: Sequelize.INTEGER,
    defaultValue: 0,  
  },
  chaleco_salvavidas: {
    type: Sequelize.INTEGER,
    defaultValue: 0,  
  },
  productoId: {
    type: Sequelize.INTEGER,
    field: 'ProductoId', 
    allowNull: false,    
    references: {
      model: 'PRODUCTO', 
      key: 'id'          
    }
  },
  turnoId: {
    type: Sequelize.INTEGER,
    field: 'TurnoId',
    allowNull: false,
    references: {
      model: 'TURNO', 
      key: 'id'
    }
  },
}, {
  tableName: 'ALQUILER',  
  timestamps: false,  
});

module.exports = Alquiler;
