const schema= normalizr.schema;
const denormalize= normalizr.denormalize;

const schemaAuthor = new schema.Entity('author',{},{idAttribute: 'email'});

// Definimos un esquema de mensaje
const schemaMensaje = new schema.Entity('post', {
    author: schemaAuthor
},{idAttribute: '_id'})

// Definimos un esquema de posts
const schemaMensajes = new schema.Entity('posts', {
  msj: [schemaMensaje]
},{idAttribute: 'id'})

///////////////////////////////////////////////////////////////////////////////////////


const socket = io.connect();

/* si recibo productos, los muestro usando handlebars */
socket.on('productos', function (productos) {
    document.getElementById('datos').innerHTML = data2TableHBS(productos);
});

socket.on('mensajes', data =>{ 
    if(data.length != 0){
        let denormalizedData = denormalize(data.result, schemaMensajes, data.entities);
        //console.log('\n desnorm', JSON.stringify(denormalizedData, null, 3));

        //Calculo de %COMPRENSION 
        //console.log('normalizado',JSON.stringify(data).length)
        //console.log('desnormalizado',JSON.stringify(denormalizedData).length)
        let comprension=(JSON.stringify(data).length/JSON.stringify(denormalizedData).length - 1)*100;
        console.log('comprension',comprension)
        const plantilla = `<h2 class="form-group"> (Comprensión: ${parseInt(comprension)} %) </h2>`
        document.getElementById('comprension').innerHTML = plantilla;

        render(denormalizedData.msj);
    }else{
        render([]);
    }
});


/* Funciones para Chats*/
function render(data,comprension){
    let html=data.map(function(elem) {
    return (`
    <div class="form-group">
    <strong style="color:blue;">${elem.author.email} </strong>
    <em style="color:brown;">${elem.fyh} </em>
    <em style="color:green;">${elem.text} </em>
     <img width="50" src=${elem.author.avatar}></img>
    </div>
    `)
    }).join(" "); 

    document.getElementById('mensajes').innerHTML=html;
    document.getElementById('centroMsj1',).reset();
    document.getElementById('centroMsj2').reset();
}


function addMessage(event){
  
    let msj={
        author:{
            email: document.getElementById('email').value,
            name: document.getElementById('name').value,
            apellido: document.getElementById('apellido').value,
            edad: document.getElementById('edad').value,
            alias: document.getElementById('alias').value,
            avatar: document.getElementById('avatar').value

            },
        fyh: `${moment().format("DD/MM/YYYY HH:mm:ss")}`,
        text: document.getElementById('text').value
    };

    socket.emit('nuevo mensaje', msj)
    return false;
}



/* Funciones para Tabla de productos*/
const form = document.querySelector('form');

form.addEventListener('submit', event => {
    event.preventDefault();
    const data = { 
        nombre: document.getElementById('nombre').value,
        descripcion: document.getElementById('descripcion').value,
        codigo: document.getElementById('codigo').value,
        thumbnail: document.getElementById('thumbnail').value,
        precio: document.getElementById('precio').value,
        stock: document.getElementById('stock').value 
    };

    fetch('/api/productos/guardar', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then(respuesta => respuesta.json())
    .then(productos => {
        form.reset();
        socket.emit('update', 'enviar tabla a todos');
    })
    .catch(error => {
        console.log('ERROR', error);
    });
});

function data2TableHBS(productos) {
    const plantilla = `
        <style>
            .table td,
            .table th {
                vertical-align: middle;
            }
        </style>

        {{#if productos.length}}
        <div class="table-responsive">
            <table class="table table-dark">
                <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Foto</th>
                </tr>
                {{#each productos}}
                <tr>
                    <td>{{this.nombre}}</td>
                    <td>$ {{ this.precio }}</td>
                    <td><img width="50" src={{this.thumbnail}} alt="not found"></td>
                </tr>
                {{/each}}
            </table>
        </div>
        {{/if}}
    `
    var template = Handlebars.compile(plantilla);
    let html = template({ productos: productos, hayProductos: productos.length });
    return html;
}
