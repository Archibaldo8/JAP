//array donde se cargarán los datos recibidos:

const selectedCAT = localStorage.getItem("catID");
const urlCAT = PRODUCTS_URL + selectedCAT + ".json";

const search = document.getElementById("search");

const ORDER_ASC_BY_COST = "asc";
const ORDER_DESC_BY_COST = "desc";
const ORDER_BY_PROD_COUNT = "Cant.";

let currentProductsArray = [];
let filteredArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;
//
// sortProducts
//
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
      let aCount = parseInt(a.soldCount);
      let bCount = parseInt(b.soldCount);

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

function showProductsList() {
  let htmlContentToAppend = "";

  for (let i = 0; i < filteredArray.length; i++) {
    let product = filteredArray[i];

    if (
      (minCount == undefined ||
        (minCount != undefined && parseInt(product.cost) >= minCount)) &&
      (maxCount == undefined ||
        (maxCount != undefined && parseInt(product.cost) <= maxCount))
    ) {
      htmlContentToAppend +=
        `
        <div onclick ="setProdID( ${product.id})" class="list-group-item list-group-item-action cursor-active">
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

function sortAndShowProducts(sortCriteria, productsArray) {
  currentSortCriteria = sortCriteria;

  if (productsArray != undefined) {
    filteredArray = productsArray;
  }

  filteredArray = sortProducts(currentSortCriteria, filteredArray);

  showProductsList();
}

function setProdID(id) {
  localStorage.setItem("prodID", id);
  window.location = "product-info.html";
}

document.addEventListener("DOMContentLoaded", function () {
  getJSONData(urlCAT).then(function (resultObj) {
    if (resultObj.status == "ok") {
      currentProductsArray = resultObj.data.products;
      currentData = resultObj.data;

      showProductsList(currentProductsArray);
      sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data.products);

      let loginID = localStorage.getItem("loginID");
      document.getElementById("loginID").text = loginID;
      document.getElementById("prod-header").innerHTML = currentData.catName;
      document.getElementById("prod-description").innerHTML =
        "Verás aquí todos los productos de la categoría " + currentData.catName;

      console.log(currentData.catName);
    }
  });

  document.getElementById("sortAsc").addEventListener("click", function () {
    sortAndShowProducts(ORDER_ASC_BY_COST);
  });

  document.getElementById("sortDesc").addEventListener("click", function () {
    sortAndShowProducts(ORDER_DESC_BY_COST);
  });

  document.getElementById("sortByCount").addEventListener("click", function () {
    sortAndShowProducts(ORDER_BY_PROD_COUNT);
  });

  document
    .getElementById("clearRangeFilter")
    .addEventListener("click", function () {
      document.getElementById("rangeFilterCountMin").value = "";
      document.getElementById("rangeFilterCountMax").value = "";

      minCount = undefined;
      maxCount = undefined;

      showProductsList();
    });

  document
    .getElementById("rangeFilterCount")
    .addEventListener("click", function () {
      //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
      //de productos por categoría.
      minCount = document.getElementById("rangeFilterCountMin").value;
      maxCount = document.getElementById("rangeFilterCountMax").value;

      if (minCount != undefined && minCount != "" && parseInt(minCount) >= 0) {
        minCount = parseInt(minCount);
      } else {
        minCount = undefined;
      }

      if (maxCount != undefined && maxCount != "" && parseInt(maxCount) >= 0) {
        maxCount = parseInt(maxCount);
      } else {
        maxCount = undefined;
      }

      showProductsList();
    });

  search.addEventListener("input", (event) => {
    filteredArray = currentProductsArray.filter(
      (value) =>
        value.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
        value.description.toLowerCase().includes(event.target.value)
    );
    showProductsList();
  });
});
