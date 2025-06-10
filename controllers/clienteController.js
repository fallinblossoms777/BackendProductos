const Cliente = require("../models/clienteModel"); 

const getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll(); 
        res.status(200).json(clientes); 
    } catch (error) {
        console.error("Error al obtener los clientes:", error); 
        res.status(500).json({ error: "Error al obtener los clientes" }); 
    }
}

const getClienteById = async (req, res) => {
    const id = req.params.id; 
    try {
        const cliente = await Cliente.findByPk(id); 
        if (!cliente) {
            return res.status(404).json({ error: "Cliente no encontrado" }); 
        }
        res.status(200).json(cliente); 
    } catch (error) {
        console.error("Error al obtener el cliente:", error); 
        res.status(500).json({ error: "Error al obtener el cliente" }); 
    }
}

const createCliente = async (req, res) => {
    const { nombre, email, apellido, telefono, direccion } = req.body; 
    try {
        const nuevoCliente = await Cliente.create({ nombre, email, apellido, telefono, direccion }); 
        res.status(201).json(nuevoCliente); 
    } catch (error) {
        console.error("Error al crear el cliente:", error); 
        res.status(500).json({ error: "Error al crear el cliente" }); 
    }
}

const updateCliente = async (req, res) => {
    const id = req.params.id; 
    const { nombre, email, apellido, telefono, direccion } = req.body; 
    try {
        const cliente = await Cliente.findByPk(id); 
        if (!cliente) {
            return res.status(404).json({ error: "Cliente no encontrado" }); 
        }
        await cliente.update({ nombre, email, apellido, telefono, direccion }); 
        res.status(200).json(cliente); 
    } catch (error) {
        console.error("Error al actualizar el cliente:", error); 
        res.status(500).json({ error: "Error al actualizar el cliente" }); 
    }
}

const deleteCliente = async (req, res) => {
    const id = req.params.id; 
    try {
        const cliente = await Cliente.findByPk(id); 
        if (!cliente) {
            return res.status(404).json({ error: "Cliente no encontrado" }); 
        }
        await cliente.destroy(); 
    } catch (error) {
        console.error("Error al eliminar el cliente:", error); 
        res.status(500).json({ error: "Error al eliminar el cliente" }); 
    }
}

module.exports = {
    getClientes,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente
};
