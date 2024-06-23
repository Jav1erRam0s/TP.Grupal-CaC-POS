const modalProductForm = document.getElementById("modalProductForm");
const containerProducts = document.getElementById("container-productos");
var idEditProduct = 0;

var miListaDeProductos;

listarProductos();

async function listarProductos() {
  let misProductos = "";

  //GET PRODUCTS
  const response = await fetch("/products");
  const productos = await response.json();
  miListaDeProductos = productos;

  productos.forEach((producto) => {
    misProductos += `
          <tr>
            <th class="text-center" scope="row">${producto.id}</th>
            <td class="text-center">${producto.nombre}</td>
            <td >${producto.descripcion}</td>
            <td class="d-flex justify-content-center"><img class="tbl-img-product" src="${producto.imagen}" alt="-"/></td>
            <td class="text-center">${producto.codigo}</td>
            <td class="text-center">$ ${producto.precio}</td>
            <td class="text-center"><a class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#formProductModal" onclick="editarProducto(${producto.id})">Editar</a></td>
          </tr>
        `;
  });

  containerProducts.innerHTML = `
      <table class="table">
        <thead>
            <tr>
            <th class="text-center" scope="col">ID</th>
            <th class="text-center" scope="col">Nombre</th>
            <th scope="col">Descripción</th>
            <th class="text-center" scope="col">Imagen</th>
            <th class="text-center" scope="col">Código</th>
            <th class="text-center" scope="col">Precio</th>
            <th class="text-center" scope="col">Acción</th>
            </tr>
        </thead>
        <tbody>
            ${misProductos}
        </tbody>
      </table>
    `;
}

// CLICK BUTTON - CREAR PRODUCTO
function crearProducto() {
  // Editamos el estilo del form
  document.getElementById("titleModal").innerHTML = "Crear producto";
  document.getElementById("btn-action").textContent = "Crear";
  document.getElementById("btn-action").className = "w-100 btn btn-success";
}

// CLICK BUTTON - EDITAR PRODUCTO
function editarProducto(id) {
  // Guardamos el ID del producto a editar
  idEditProduct = id;
  // Editamos el estilo del form
  document.getElementById("titleModal").innerHTML = "Editar producto";
  document.getElementById("btn-action").textContent = "Editar";
  document.getElementById("btn-action").className = "w-100 btn btn-primary";
  // Buscamos nuestro producto
  const producto = miListaDeProductos.find(
    (miListaDeProductos) => miListaDeProductos.id == id
  );
  // Cargamos el formulario con los datos obtenidos
  document.getElementById("form-nombre").value = producto.nombre;
  document.getElementById("form-descripcion").value = producto.descripcion;
  document.getElementById("form-imagen").value = producto.imagen;
  document.getElementById("product-img-preview").src = producto.imagen;
  document.getElementById("form-precio").value = producto.precio;
  document.getElementById("form-codigo").value = producto.codigo;
}

// EDICION CAMPO IMG MODAL
function editFieldImg() {
  const imagen = document.getElementById("form-imagen").value;
  document.getElementById("product-img-preview").src = imagen;
}

// CREAR O EDITAR PRODUCTO
document
  .getElementById("btn-action")
  .addEventListener("click", async function (event) {
    event.preventDefault();

    const typeAction = document.getElementById("btn-action").textContent;

    const formData = new FormData(modalProductForm);

    // AQUI VALIDACION DE LOS DATOS
    // ...
    // ...

    const data = {
      nombre: formData.get("nombre"),
      descripcion: formData.get("descripcion"),
      imagen: formData.get("imagen"),
      precio: parseFloat(formData.get("precio")),
      codigo: formData.get("codigo"),
    };

    if (typeAction == "Crear") {
      // CREAMOS EL PRODUCTO
      var response = await fetch("/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } else if (typeAction == "Editar") {
      // EDITAMOS EL PRODUCTO
      var response = await fetch(`/products/${idEditProduct}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }

    // RESETEAMOS EL FORM-MODAL
    modalProductForm.reset();
    document.getElementById("product-img-preview").src = "";
    listarProductos();
    // MOSTRAMOS LA RESPUESTA DE LA OPERACION
    const result = await response.json();
    alert(result.mensaje);
  });

function cerrarModal() {
  modalProductForm.reset();
  document.getElementById("product-img-preview").src = "";
}
