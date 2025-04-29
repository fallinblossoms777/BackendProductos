const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Pago = sequelize.define('Pago', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  monto: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  moneda: {
    type: Sequelize.ENUM('local', 'extranjera'),
    allowNull: false
  },
  fecha_pago: {
    type: Sequelize.DATE,
    allowNull: false
  },
  metodo_pago: {
    type: Sequelize.ENUM('efectivo', 'tarjeta'),
    allowNull: false
  },
  seguro_tormenta: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  monto_devolucion: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  clienteId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    field: 'ClienteId',
    references: {
      model: 'CLIENTE', 
      key: 'id'
    }
  },
  turnoId: { 
    type: Sequelize.INTEGER,
    allowNull: false,
    field: 'TurnoId',
    references: {
      model: 'TURNO', 
      key: 'id'
    }
  },
}, {
  tableName: 'PAGO',
  timestamps: false
});

module.exports = Pago;
