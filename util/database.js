const Sequelize = require ('sequelize');

const sequelize = new Sequelize('alquiler_productos', 'root', 'tu_contraseña', { 
    host: 'localhost', 
    port: 3306, 
    dialect: 'mysql',
});


sequelize.authenticate()
    .then(() => { 
        console.log('Conexión a la base de datos establecida correctamente.');
    })
    .catch(err => { 
        console.error('No se pudo conectar a la base de datos.');
    });

module.exports = sequelize;