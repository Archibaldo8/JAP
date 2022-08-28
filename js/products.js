//array donde se cargarán los datos recibidos:

const selectedCAT = localStorage.getItem("catID");
const urlCAT = PRODUCTS_URL + selectedCAT + ".json";

const ORDER_ASC_BY_COST = "asc";
const ORDER_DESC_BY_COST = "desc";
const ORDER_BY_PROD_COUNT = "Cant.";

let currentProductsArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

const FILTER_BUTTON = document.getElementById("rangeFilterCount");
let minCostInput = document.getElementById("rangeFilterCountMin").value;
let maxCostInput = document.getElementById("rangeFilterCountMax").value;

document.addEventListener("DOMContentLoaded", function () {
  getJSONData(urlCAT).then(function (resultObj) {
    if (resultObj.status == "ok") {
      currentProductsArray = resultObj.data.products;

      showProductsList(currentProductsArray);
      sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data.products);

      let loginID = localStorage.getItem("loginID");
      document.getElementById("loginID").text = loginID;
    }
  });
});

document.getElementById("sortAsc").addEventListener("click", function () {
  sortAndShowProducts(ORDER_ASC_BY_COST);
});

document.getElementById("sortDesc").addEventListener("click", function () {
  sortAndShowProducts(ORDER_DESC_BY_COST);
});

// resolver el filter

FILTER_BUTTON.addEventListener("click", function () {
  if (minCostInput != "" && maxCostInput != "") {
    currentProductsArray = currentProductsArray.filter(
      productsFiltered(currentProductsArray, minCostInput, maxCostInput)
    );
  } else {
    currentProductsArray = currentProductsArray;
  }
});

// resolver el filter

document
  .getElementById("clearRangeFilter")
  .addEventListener("click", function () {
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";

    minCount = undefined;
    maxCount = undefined;

    showProductsList(currentProductsArray);
  });

//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
async function showProductsList() {
  let htmlContentToAppend = "";

  for (let i = 0; i < currentProductsArray.length; i++) {
    let product = currentProductsArray[i];

    if (
      (minCount == undefined ||
        (minCount != undefined && parseInt(product.soldCount) >= minCount)) &&
      (maxCount == undefined ||
        (maxCount != undefined && parseInt(product.soldCount) <= maxCount))
    ) {
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
    }
    document.getElementById("prod-container").innerHTML = htmlContentToAppend;
  }
}

function sortProducts(criteria, array) {
  let result = [];
  if (criteria === ORDER_ASC_BY_COST) {
    result = array.sort(function (a, b) {
      if (a.cost < b.cost) {
        return -1;
      }
      if (a.cost > b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_DESC_BY_COST) {
    result = array.sort(function (a, b) {
      if (a.cost > b.cost) {
        return -1;
      }
      if (a.cost < b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_BY_PROD_COUNT) {
    result = array.sort(function (a, b) {
      let aCount = parseInt(a.productCount);
      let bCount = parseInt(b.productCount);

      if (aCount > bCount) {
        return -1;
      }
      if (aCount < bCount) {
        return 1;
      }
      return 0;
    });
  }

  return result;
}

function sortAndShowProducts(sortCriteria, productsArray) {
  currentSortCriteria = sortCriteria;

  if (productsArray != undefined) {
    currentCategoriesArray = productsArray;
  }

  currentProductsArray = sortProducts(
    currentSortCriteria,
    currentProductsArray
  );

  showProductsList();
}

//resolver filtro de productos para agregarlo al eventlistener del boton y que vuelva a tirar

function productsFiltered(array, min, max) {
  for (n of array.cost) {
    return n.cost >= min && n.cost <= max;
  }
}
