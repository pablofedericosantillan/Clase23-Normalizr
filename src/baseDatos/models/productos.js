const mongoose = require('mongoose');

const schema = mongoose.Schema({
    timestamp: { type: String, require: true, max: 100 },
    nombre: { type: String, require: true, max: 100 },
    descripcion: { type: String, require: true, max: 100 },
    codigo: { type: String, require: true},//, unique: true},
    thumbnail: { type: String, require: true, max: 100 },
    precio: { type: Number, require: true },
    stock: { type: Number, require: true }
});

const Productos = mongoose.model('productos', schema);

module.exports = Productos;
