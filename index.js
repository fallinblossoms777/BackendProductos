const express = require('express');
const app = express();
const sequelize = require("./util/database");
const producto = require("./models/productoModel");
const cliente = require("./models/clienteModel");
const turno = require("./models/turnoModel");
const alquiler = require("./models/alquilerModel");
const cancelacion = require("./models/cancelacionModel");
const pago = require("./models/pagoModel");

const productoRoutes = require('./routes/productoRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const turnoRoutes = require('./routes/turnoRoutes');
const alquilerRoutes = require('./routes/alquilerRoutes');
const cancelacionRoutes = require('./routes/cancelacionRoutes');
const pagoRoutes = require('./routes/pagoRoutes');

app.use(express.json());

app.use('/producto', productoRoutes);
app.use('/cliente', clienteRoutes);
app.use('/turno', turnoRoutes);
app.use('/alquiler', alquilerRoutes);
app.use('/cancelacion', cancelacionRoutes);
app.use('/pago', pagoRoutes);

cliente.hasMany(turno);
turno.hasMany(alquiler);
producto.hasMany(alquiler);
cliente.hasMany(pago);
turno.hasMany(pago);

sequelize.sync().then (result => {
    console.log(result);
}).catch (err => {
    console.log(err);
});

app.listen(6500,() => {
    console.log('Servidor corriendo en el puerto 6500');
});

