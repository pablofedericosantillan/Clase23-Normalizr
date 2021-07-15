const mongoose = require('mongoose');

const schema = mongoose.Schema({
    email: { type: String, required: true, max: 100 },
    msj: { type: String, required: true, max: 100 },
    fyh: { type: String, required: true },
});

const Mensajes = mongoose.model('mensajes', schema);

module.exports = Mensajes;
