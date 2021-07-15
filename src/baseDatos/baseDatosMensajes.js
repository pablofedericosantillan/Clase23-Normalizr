const mensajes = require('./models/mensajes');

class BaseDatosMensajes {
    constructor() {
    }
    async leer(){
        try{
            let result = await mensajes.find()
                return result;

            }catch(err){
               console.log('Error en guardar MSJ mongo',err); 
           }
       }

    async guardar(mjs){
        try{
            await mensajes.create(mjs);
            return false;

         }catch(err){
            console.log('Error en guardar MSJ mongo',err); 
        }
    }

}

module.exports = new BaseDatosMensajes();