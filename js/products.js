//array donde se cargarán los datos recibidos:

const urlAutos = PRODUCTS_URL + "101.json";

document.addEventListener("DOMContentLoaded", function () {
  getJSONData(urlAutos).then(function (resultObj) {
    if (resultObj.status == "ok") {
      productsArray = resultObj.data.products;
      showProducts(productsArray);
    }
  });
});

//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
async function showProducts(array) {
  let htmlContentToAppend = "";

  for (let i = 0; i < array.length; i++) {
    let product = array[i];
    htmlContentToAppend +=
      `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` +
      product.image +
      `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>` +
      product.name +
      ` - ` +
      product.cost +
      ` ` +
      product.currency +
      `</h4> 
                        <p> ` +
      product.description +
      `</p> 
                        </div>
                        <small class="text-muted">` +
      product.soldCount +
      ` artículos</small> 
                    </div>

                </div>
            </div>
        </div>
        `;
    document.getElementById("prod-container").innerHTML = htmlContentToAppend;
  }
}
