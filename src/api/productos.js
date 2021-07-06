const moment = require('moment');
const baseDatos = require('../baseDatos/baseDatos');


class Productos {
    constructor() {
        this.item = [];
    }

    listar() {
            try{
                return this.item;
            }catch(err){
                console.log('Error en la funcion listar', err); 
            }
    }

    buscarPorId(id){
        try{
            let producto = this.item.find(p => p.id == id);
            return producto || { error: `producto con id ${id} no encontrado`};
        }catch(err){
            console.log('Error en la funcion buscarPorId', err); 
        }
    }

     async guardar(newProduct){
            try{
            newProduct.timestamp= `${moment().format("DD/MM/YYYY HH:mm:ss")}`;
            await baseDatos.guardar(newProduct,'productos')
                if(this.item.length === 0){
                    newProduct.id=1;
                     }else{
                    newProduct.id=this.item[this.item.length-1].id+1;
                }
                this.item.push(newProduct);
                return newProduct;
            }catch(err){
                console.log('Error en la funcion agregar', err); 
            }

    }

   async actualizar(id,newProduct){
            try{
                newProduct.timestamp= `${moment().format("DD/MM/YYYY HH:mm:ss")}`;
                await baseDatos.actualizar(id,newProduct,'productos');
                newProduct.id = Number(id);
                let index = this.item.findIndex(p => p.id == id);
                this.item.splice(index, 1, newProduct);
                return newProduct;
            }catch(err){
                console.log('Error en la funcion actualizar', err); 
            }
    }
    
    async borrar(id){         
            try{
                if(id <= this.item.length){
                    let index = this.item.findIndex(p => p.id == id);
                    this.item.splice(index, 1)
                    await baseDatos.borrar(id,'productos')
                    return 'Proceso de borrado exitoso!';
                }else{
                return {error: "producto no encontrado para Borrar" }
                }
            }catch(err){
                console.log('Error en la funcion borrar', err); 
            }                   
    }
}

module.exports = new Productos();