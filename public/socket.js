/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const socket = io.connect('http://localhost:8080', { forceNew: true });

const formMensaje = document.getElementById('formMensajes');
const mensajesContainer = document.getElementById('mensajesContainer');

socket.emit('inicio-productos');

socket.on('producto-update', (products) => {
  products.forEach((product) => {
    addTr(product);
    console.log(product);
  });
});

const addTr = (product) => {
  const table = $('#lista');
  const trClone = $('#lista tbody tr:first');

  const nuevoTr = `<td>${product.title}</td>
        <td>${product.price}</td>
        <td>
            <img src="${product.thumbnail}" class="" alt="20px">
        </td>`;
  const tr = trClone.clone();
  tr.html(nuevoTr);
  tr.show();
  table.append(tr);
};

function render(data) {
  console.log(data);
  const html = data
    .map((elem, index) => {
      return `<div>
      <span class='mx-2 mensaje__email'>${elem.author.email}</span>
        <span class='mx-2 mensaje__time'>${elem.author.nombre}</span>
        <span class='mx-2 mensaje__text'>${elem.text}</span>
     </div>`;
    })
    .join(' ');
  document.getElementById('mensajesContainer').innerHTML += html;
}

function addMessage() {
  // event.preventDefault();
  const email = document.getElementById('email');
  const nombre = document.getElementById('nombrem');
  const apellido = document.getElementById('apellido');
  const alias = document.getElementById('alias');
  const edad = document.getElementById('edad');
  const avatar = document.getElementById('avatar');
  const mensaje = document.getElementById('mensaje');

  if (email.value && mensaje.value) {
    let data = {
      author: {
        email: email.value,
        nombre: nombre.value,
        apellido: apellido.value,
        alias: alias.value,
        edad: edad.value,
        avatar: avatar.value,
      },
      text: mensaje.value,
    };
    console.log('EMITIENDO SOCKET');

    socket.emit('new-message', data);
    mensaje.value = '';
  }
}

socket.on('message-update', function (data) {
  console.log('RECIBI MENSAJE message-update', data);
  render(data);
});
