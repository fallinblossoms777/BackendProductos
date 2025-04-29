const Sequelize = require("sequelize");
const sequelize = require("../util/database");  

const Cliente = sequelize.define('Cliente', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,  
  },
  nombre: {
    type: Sequelize.STRING(100),
    allowNull: false,  
  },
  email: {
    type: Sequelize.STRING(100),
    allowNull: false,  
    unique: true,  
  },
  telefono: {
    type: Sequelize.STRING(20),
    allowNull: true, 
  },
  direccion: {
    type: Sequelize.STRING(255),
    allowNull: true,  
  }
}, {
  tableName: 'CLIENTE', 
  timestamps: false, 
});

module.exports = Cliente;
