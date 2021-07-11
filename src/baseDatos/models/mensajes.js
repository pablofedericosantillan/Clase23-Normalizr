const mongoose = require('mongoose');

const schema = mongoose.Schema({
    email: { type: String, require: true, max: 100 },
    msj: { type: String, require: true, max: 100 },
    fyh: { type: String, require: true },
});

const Mensajes = mongoose.model('mensajes', schema);

module.exports = Mensajes;
