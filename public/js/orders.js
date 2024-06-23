const idUsuario = 4;
var idEditOrder = 0;

const containerOrders = document.getElementById("container-ordenes");
const containerModal = document.getElementById("container-modal");
var miListaDeOrdenes;

var idDeleteOrder = 0;

listarOrdenes();

async function listarOrdenes() {
  let misOrdenes = "";

  //GET PRODUCTS
  const response = await fetch("/orders/user/" + idUsuario);
  const ordenes = await response.json();
  miListaDeOrdenes = ordenes;

  ordenes.forEach((orden) => {
    misOrdenes += `
          <tr>
            <th class="text-center" scope="row">${orden.id_orden}</th>
            <td class="text-center">${orden.numero_ticket}</td>
            <td class="text-center">${orden.fecha.split("T")[0]}</td>
            <td class="text-center">${orden.hora}</td>
            <td class="text-center">$ ${orden.total}</td>
            <td class="text-center">
              <a class="btn btn-info" data-bs-toggle="modal" data-bs-target="#formOrderModal" onclick="verOrden(${
                orden.id_orden
              })">Ver</a>
              <a class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#confirmDeleteModal" onclick="eliminarOrden(${
                orden.id_orden
              })">Eliminar</a>
            </td>
          </tr>
        `;
  });

  containerOrders.innerHTML = `
      <table class="table">
        <thead>
            <tr>
            <th class="text-center" scope="col">ID</th>
            <th class="text-center" scope="col">Número de ticket</th>
            <th class="text-center" scope="col">Fecha</th>
            <th class="text-center" scope="col">Hora</th>
            <th class="text-center" scope="col">Total</th>
            <th class="text-center" scope="col">Acción</th>
            </tr>
        </thead>
        <tbody>
            ${misOrdenes}
        </tbody>
      </table>
    `;
}

/*
function crearOrden() {
  // Editamos el estilo del form
  document.getElementById("titleModal").innerHTML = "Crear orden";
  document.getElementById("btn-action").textContent = "Crear";
  document.getElementById("btn-action").className = "w-100 btn btn-success";
}

function editarOrden(id) {
  // Guardamos el ID de la orden a editar
  idEditOrder = id;
  // Editamos el estilo del form
  document.getElementById("titleModal").innerHTML = "Editar orden";
  document.getElementById("btn-action").textContent = "Editar";
  document.getElementById("btn-action").className = "w-100 btn btn-primary";
}
*/

async function verOrden(id) {
  const orden = miListaDeOrdenes.find(
    (miListaDeOrdenes) => miListaDeOrdenes.id_orden == id
  );

  document.getElementById("titleModal").innerHTML =
    `<span class="fw-bold">Orden: </span>` + orden.numero_ticket;

  document.getElementById("total-orden").innerHTML = "$ " + orden.total;

  let misOProductos = "";

  const response = await fetch("/orders/" + id);
  const ordenProductos = await response.json();

  ordenProductos.forEach((oProducto) => {
    misOProductos += `
      <tr>
        <td class="text-center" scope="row">${oProducto.nombre} ${
      oProducto.descripcion
    }</td>
        <td class="d-flex justify-content-center"><img class="tbl-img-product" src="${
          oProducto.imagen
        }" alt="-"/></td>
        <td class="text-center">${oProducto.codigo}</td>
        <td class="text-center">$ ${oProducto.precio}</td>
        <td class="text-center">${oProducto.unidades}</td>
        <td class="text-center">$ ${oProducto.precio * oProducto.unidades}</td>
      </tr>
    `;
  });

  containerModal.innerHTML = `
    <table class="table">
      <thead>
          <tr>
            <th class="text-center" scope="col">Producto</th>
            <th class="text-center" scope="col">Imagen</th>
            <th class="text-center" scope="col">Código</th>
            <th class="text-center" scope="col">Precio</th>
            <th class="text-center" scope="col">Unidades</th>
            <th class="text-center" scope="col">Subtotal</th>
          </tr>
      </thead>
      <tbody>
          ${misOProductos}
      </tbody>
    </table>
  `;
}

function eliminarOrden(id) {
  idDeleteOrder = id;
}

async function confirmacionEliminarOrden() {
  const response = await fetch(`/orders/${idDeleteOrder}`, {
    method: "DELETE",
  });

  const result = await response.json();
  alert(result.mensaje);

  listarOrdenes();
}
