//array donde se cargarán los datos recibidos:

urlAutos = PRODUCTS_URL + "101.json";

console.log(urlAutos);

let productsArray = [];

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
      product.soldCount +
      `</h4> 
                        <p> ` +
      product.description +
      `</p> 
                        </div>
                        <small class="text-muted">` +
      product.name +
      ` artículos</small> 
                    </div>

                </div>
            </div>
        </div>
        `;
    document.getElementById("container").innerHTML = htmlContentToAppend;
  }
}

const showMovies = (array) => {
  // ## INICIO BLOQUE 3 ##
  debugger;
  const container = document.getElementById("container");
  container.innerHTML = "";
  for (let product of array) {
    container.innerHTML += getCardHTML(product.poster_path, product.title);
  }
  // ## FIN BLOQUE 3 ##
};

const getProducts = (search) => {
  return getJSONData(urlAutos);
};
