const mongoose = require('mongoose');
const mensajes = require('./models/mensajes');
const config = require('./config/config.json');

class BaseDatosMensajes {
    constructor() {
    }

    async guardar(mjs){
        try{
            await mongoose.connect(config.MONGO_URL_MENSAJES, { useNewUrlParser: true, useUnifiedTopology: true });
            await mensajes.create(mjs);
            return false;

         }catch(err){
            console.log('Error en guardar MSJ mongo',err); 
        }
    }

}

module.exports = new BaseDatosMensajes();