const userID = 25801;
const CURRENT_CART = CART_INFO_URL + userID + ".json";
const cartListHTML = document.getElementById("cart-container");
const cartItems = cartListHTML.getElementsByClassName("list-group-item");
let forms = document.querySelectorAll(".needs-validation");
let Subtotal = 0;
let CostoEnvio = 0;
let currentCartInfo = [];

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

/// DESAFIATE 6 ///

function removeProduct(clicked) {
  let currentCartArray = JSON.parse(localStorage.getItem("cart"));
  let selectedProduct = clicked.parentElement.parentElement;
  let selectedProductID = selectedProduct.id;

  let updatedCartArray = currentCartArray.filter(
    (p) => p.id != selectedProductID
  );

  localStorage.setItem("cart", JSON.stringify(updatedCartArray));

  showCurrentCart(updatedCartArray);
  calculateSubtotal();
  calcularCostoEnvio();
  calculateTotal();
}

function showCurrentCart(array) {
  let htmlContentToAppend = `
  <table
  class = "table show-products-table"
  style = "width:100%" >
  <thead>
   <tr>
      <th scope="col"></th>
      <th scope="col">Nombre</th>
      <th scope="col">Costo</th>
      <th scope="col">Cantidad</th>
      <th scope="col">Subtotal</th>
      <th scope="col"></th>
    </tr>
  </thead>

   <tbody>
  `;

  for (let i = 0; i < array.length; i++) {
    let product = array[i];

    htmlContentToAppend += `


        <tr id = ${product.id}>
      <td
    >
      <div>
      <img 
      src="${product.image}" 
      class = "image-thumbnail secondaryImage"> 
      </div>
      
      </td>

      <td>
        <div>
        ${product.name}
        </div>        
      </td>

      <td
      type ="number"
      step = "0.5"
      >
      USD
      <span
      class="unitCost">

      ${(product.unitCost / 41).toFixed(1)}
      </span>
      </td>


      <td
    >
        <div>
          <input 
          type="number" 
          class="qty_input form-control" 
          min=1 
          oninput="updateProductTotal(this), calculateSubtotal(), calcularCostoEnvio(), calculateTotal()" 
          value = "${product.count}">
        </div>
      </td>
      


       <td 
      
       type ="text" > 
       USD 
       <span 
       class="total" >
       ${(product.unitCost / 41).toFixed(1) * product.count}
       </span>
       </td>
      
      <td
    >
      <button
      class="btn btn-outline-danger"
      onclick = "removeProduct(this)">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16" data-darkreader-inline-fill="" style="--darkreader-inline-fill:currentColor;">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
</svg>
      
      </button>
      </td>


    </tr>


        </div>
        </div>
        </div>
        `;
  }
  htmlContentToAppend += `</tbody>
  </table>`;

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

  document.getElementById("Subtotal").innerHTML = Subtotal.toFixed(1);
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
  document.getElementById("CostoEnvio").innerHTML = CostoEnvio.toFixed(1);

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
