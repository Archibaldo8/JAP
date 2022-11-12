const userID = 25801;
const CURRENT_CART = CART_INFO_URL + userID + ".json";
const cartListHTML = document.getElementById("cart-container");
const cartItems = cartListHTML.getElementsByClassName("list-group-item");

let forms = document.querySelectorAll(".needs-validation");

let Subtotal = 0;

let CostoEnvio = 0;

let currentCartInfo = [];

console.log(CURRENT_CART);

function updateProductTotal(clicked) {
  let element = clicked.parentElement.parentElement.parentElement;

  let qty = element.getElementsByClassName("qty_input")[0].value;
  let totalHTML = parseInt(
    element.getElementsByClassName("total")[0].innerText
  );
  let cost = parseInt(element.getElementsByClassName("unitCost")[0].innerText);
  let total = qty * cost;

  console.log(total);

  validateNonEmptyQty();

  element.getElementsByClassName("total")[0].innerText = total;

  console.log(totalHTML);
}

function showCurrentCart(array) {
  let htmlContentToAppend = "";

  for (let i = 0; i < array.length; i++) {
    let product = array[i];
    htmlContentToAppend += `
        <div class="list-group-item">
        <div class ="row">
        <div class = col-3">    
        
        <table class="table">
        <tr>
        <th scope="col"> </th>
          <th scope="col-3"> Nombre </th>
          <th scope="col-3">Costo</th>
          <th scope="col-3" >Cantidad</th>
          <th scope="col-3">Subtotal</th>
        </tr>

        <tr>
      <th scope="row"><img src="${
        product.image
      }" class = "image-thumbnail secondaryImage"> </th>
      <td>${product.name}</td>
      <td type ="number" class="unitCost">${product.unitCost}</td>
      <td><div class = "col-sm-2"><input type="number" class="qty_input form-control" min=1 oninput="updateProductTotal(this), calculateSubtotal(), calcularCostoEnvio(), calculateTotal()" value = "${
        product.count
      }" ></div></td>
       <td type ="text" > USD <span class="total" >${
         product.unitCost * product.count
       }</span></td>
    </tr>

        </table>

        </div>
        </div>
        </div>
        `;
  }

  document.getElementById("cart-container").innerHTML = htmlContentToAppend;
}

function calculateSubtotal() {
  let allTotals = document.getElementsByClassName("total");
  let totalList = [];

  for (i of allTotals) {
    totalList.push(parseInt(i.innerText));
  }

  let totalAdded = totalList.reduce((partialSum, a) => partialSum + a, 0);

  Subtotal = totalAdded;

  document.getElementById("Subtotal").innerHTML = Subtotal;
}

function calcularCostoEnvio() {
  if (!(document.querySelector("input[name=envio]:checked") === null)) {
    multiplicadorEnvio =
      document.querySelector("input[name=envio]:checked").value / 100;
  } else {
    multiplicadorEnvio = 0;
  }

  let Subtotal = parseInt(document.getElementById("Subtotal").innerText);
  let CostoEnvio = Subtotal * multiplicadorEnvio;
  document.getElementById("CostoEnvio").innerHTML = CostoEnvio;

  console.log(CostoEnvio);
}

function calculateTotal() {
  let Subtotal = parseInt(document.getElementById("Subtotal").innerText);
  let CostoEnvio = parseInt(document.getElementById("CostoEnvio").innerText);

  let Total = Subtotal + CostoEnvio;

  document.getElementById("Total").innerHTML = Total;
}

function setMedioPago() {
  let medioPagoSelect = document.querySelector("input[name=pago]:checked");
  let medioPagoNotSelected = document.querySelector(
    "input[name=pago]:not(:checked)"
  );

  let inputsInMedioPagoSelect =
    medioPagoSelect.parentElement.parentElement.getElementsByClassName(
      "completar"
    );
  let inputsInMedioPagoNotSelected =
    medioPagoNotSelected.parentElement.parentElement.getElementsByClassName(
      "completar"
    );

  function disableTextInputs() {
    for (x of inputsInMedioPagoNotSelected) {
      x.disabled = true;
    }
  }

  function enableTextInputs() {
    for (x of inputsInMedioPagoSelect) {
      x.disabled = false;
    }
  }

  disableTextInputs();
  enableTextInputs();

  let medioPagoShown = document.getElementById("medioPagoShown");

  medioPagoShown.textContent = medioPagoSelect.value;
}

function validateNonEmptyQty() {
  let qtyAll = document.getElementsByClassName("qty_input");
  let bool = true;

  for (let field of qtyAll) {
    if (field.value != 0 || field.value != null) {
      bool = false;
    }
  }

  return bool;
}

// Validacion de campos

Array.prototype.slice.call(forms).forEach(function (form) {
  form.addEventListener(
    "submit",
    function (event) {
      if (!form.checkValidity() && !validateNonEmptyQty()) {
        document;
        document
          .getElementById("notSeleccionadoPago")
          .classList.remove("d-none");
        document.getElementById("notSeleccionadoPago").classList.add("d-flex");
        document
          .getElementById("notSeleccionadoEnvio")
          .classList.remove("d-none");
        document.getElementById("notSeleccionadoEnvio").classList.add("d-flex");
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();
        document.getElementsByClassName("alert")[0].classList.remove("d-none");

        setTimeout(function () {
          window.location.reload();
        }, 2000);
      }

      form.classList.add("was-validated");

      console.log(document.getElementsByName("pago"));
    },
    false
  );
});
// ojo aca estamos usando localstorage.getItem en lugar de getJsonData para traer los datos, aunque la funcion este llamada no se usa para nada

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CURRENT_CART).then(function (resultObj) {
    if (resultObj.status === "ok") {
      currentCartInfo = resultObj.data.articles;
      showCurrentCart(JSON.parse(localStorage.getItem("cart")));
      calculateSubtotal();
      calcularCostoEnvio();
      calculateTotal();
      console.log(forms);
    }
  });
});
