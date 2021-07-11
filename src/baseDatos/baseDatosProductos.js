const mongoose = require('mongoose');
const productos = require('./models/productos');
const config = require('./config/config.json');

class BaseDatosProductos {
    constructor() {
    }

    async buscarId(product){
        try{
            await mongoose.connect(config.MONGO_URL_PRODUCTOS, { useNewUrlParser: true, useUnifiedTopology: true });
            let result = await productos.find({
            timestamp: product.timestamp,
            nombre: product.nombre,
            descripcion: product.descripcion,
            codigo: product.codigo,
            thumbnail: product.thumbnail,
            precio: product.precio,
            stock: product.stock
            });
            return result[0]._id;

         }catch(err){
            console.log('Error en buscarId mongo',err); 
        }
    }

    async guardar(newProduct){
        try{
            await mongoose.connect(config.MONGO_URL_PRODUCTOS, { useNewUrlParser: true, useUnifiedTopology: true });
            await productos.create(newProduct);
            return false;

         }catch(err){
            console.log('Error en guardar mongo',err); 
        }
    }

   async actualizar(id,newProduct){
        try{
            await mongoose.connect(config.MONGO_URL_PRODUCTOS, { useNewUrlParser: true, useUnifiedTopology: true });
            let product = await productos.findById(id)
            product.timestamp=newProduct.timestamp;
            product.nombre=newProduct.nombre;
            product.descripcion=newProduct.descripcion;
            product.codigo=newProduct.codigo;
            product.thumbnail=newProduct.thumbnail;
            product.precio=newProduct.precio;
            product.stock=newProduct.stock;

            product = await product.save()
            return false;

        }catch(err){
            console.log('Error en actualizar mongo',err); 
        }
    }
    
    async borrar(id){         
        try{
            await mongoose.connect(config.MONGO_URL_PRODUCTOS, { useNewUrlParser: true, useUnifiedTopology: true });
            let result = await productos.deleteOne({ _id: id });
            return false;
        }catch(err){
            console.log('Error en borrar mongo',err); 
        }             
    }
}

module.exports = new BaseDatosProductos();