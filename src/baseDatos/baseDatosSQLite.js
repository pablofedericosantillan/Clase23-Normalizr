const options = require('./config/databaseSQLite');
const knex = require('knex')(options);

class BaseDatos {
    constructor() {
    }

    async crearTablaMensajes() {
        try {        
            await knex.schema.dropTableIfExists('mensajes');
            await knex.schema.createTable('mensajes', table => {
                table.increments('id').notNullable();
                table.string('email').notNullable();
                table.string('msj').notNullable();
                table.string('fyh').notNullable();
            });
        }catch (err) {
                console.log(err);
        }
        return false;
    }

    async guardar(newProduct,tabla){
        try{
            await knex(`${tabla}`).insert(newProduct);
            return false;

         }catch(err){
            console.log('Error en la funcion guardar',err); 
        }
    }

   async actualizar(id,newProduct,tabla){
        try{
            await knex.from(`${tabla}`).where('id', `${Number(id)}`).update(newProduct)
            return false;

        }catch(err){
            console.log('Error en la funcion actualizar',err); 
        }
    }
    
    async borrar(id,tabla){         
        try{
            await knex.from(`${tabla}`).where('id', '=', `${id}`).del()
            return false;
        }catch(err){
            console.log('Error en la funcion borrar',err); 
        }             
    }
}

module.exports = new BaseDatos();