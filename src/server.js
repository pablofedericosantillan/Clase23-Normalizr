const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const productos = require('./api/productos');


app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -------------------- Base de Datos ---------------------- */
const baseDatos = require('./baseDatos/baseDatos');
const baseDatosSQLite = require('./baseDatos/baseDatosSQLite');
baseDatos.crearTablaProductos();
baseDatosSQLite.crearTablaMensajes();

/* -------------------- HTTP endpoints ---------------------- */
const productosRouter = require('./routes/productos');
app.use('/api', productosRouter);

/* -------------------- Web Sockets ---------------------- */
const mensajes = [
    { email: '', msj: '', fyh: '' },
];

io.on('connection', socket => {
    console.log('Welcome!');

    /* Socket para tabla de productos */
    socket.emit('productos', productos.listar());
    socket.on('update', async data => {
     await io.sockets.emit('productos', productos.listar());
    });

    /* Socket para chat */
    socket.emit('mensajes', mensajes);
    socket.on('nuevo mensaje', async msj=>{
        await baseDatosSQLite.guardar(msj,'mensajes')
        mensajes.push(msj)
        await io.sockets.emit('mensajes', mensajes)
    })
});

/* ------------------------------------------------------- */

const PORT = process.env.PORT || 8080;
http.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
http.on("error", error => console.log(`Error en servidor ${error}`))
