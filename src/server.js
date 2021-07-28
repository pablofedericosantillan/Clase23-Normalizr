const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const productos = require('./api/productos');


app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -------------------- Base de Datos ---------------------- */
require('./baseDatos/models/coneccion');
const baseDatosMensajes = require('./baseDatos/baseDatosMensajes');

/* -------------------- HTTP endpoints ---------------------- */
const productosRouter = require('./routes/productos');
app.use('/api', productosRouter);

/* -------------------- Web Sockets ---------------------- */
const mensajes = [];

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
        await baseDatosMensajes.guardar(msj)
        let msjs = await baseDatosMensajes.leer();
        //console.log('norm', JSON.stringify(msjs, null, 3));
        await io.sockets.emit('mensajes', msjs)
    })
});

/* ------------------------------------------------------- */

const PORT = process.env.PORT || 8080;
http.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
http.on("error", error => console.log(`Error en servidor ${error}`))
