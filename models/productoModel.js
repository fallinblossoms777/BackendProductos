const Sequelize = require("sequelize");
const sequelize = require("../util/database"); 

const Producto = sequelize.define('Producto', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,  
  },
  tipo: {
    type: Sequelize.ENUM('JetSky', 'Cuatriciclo', 'Buceo', 'Tabla Surf Niños', 'Tabla Surf Adultos'),
    allowNull: false,  
  },
  descripcion: {
    type: Sequelize.TEXT,
    allowNull: true,  
  },
  precio: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,  
  },
}, {
  tableName: 'PRODUCTO',  
  timestamps: false, 
});

module.exports = Producto;
