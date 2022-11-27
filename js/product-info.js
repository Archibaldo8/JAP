const urlINFO = PRODUCT_INFO_URL + localStorage.getItem("prodID")+".json";
const urlCOMMENTS = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("prodID")+".json";
const agregarCarrito = document.getElementById("agregarCarrito");
const sendCommentBtn = document.getElementById("enviar-comentario");

function loadStarRating(rating) {
  let checkedStarCount = rating;
  let uncheckedStarCount = 5 - rating;

  let checkedStarSymbol = `<span class="fa fa-star checked"></span>`;
  let uncheckedStarSymbol = `<span class="fa fa-star"></span>`;

  let htmlContentToAppend = "";

  htmlContentToAppend +=
    checkedStarSymbol.repeat(checkedStarCount) +
    uncheckedStarSymbol.repeat(uncheckedStarCount);

  return htmlContentToAppend;
}

function showComments(comments) {
  let htmlContentToAppend = "";

  for (let i = 0; i < comments.length; i++) {
    let comment = comments[i];

    htmlContentToAppend +=
      `
        <div class="list-group-item">
            <div class="row">
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <p>` +
      comment.user +
      `  ` +
      loadStarRating(comment.score) +
      `</p>

    <hr>
                        <small class="text-muted"> ` +
      comment.description +
      `
                        </div> 


                </div>
              
    </small> 
                        </div>
                     </div>  

        </div>
        `;
  }
  document.getElementById("comments-container").innerHTML = htmlContentToAppend;
}

function showProductInfo(info) {
  let htmlContentToAppend = "";

  htmlContentToAppend +=
    `
        <div class="list-group-item">
            <div class="row">
                <div class="col-xl-6 center-div">
                <div
                id="carouselExampleIndicators"
                class = "carousel slide pointer-event"
                data-bs-ride = "carousel">
                 ` +
    loadImagesCarouselHTML(info.images) +
    `
                    
                </div>
                </div>

                <div class="col">
                    <div class="w-100 justify-content-between">
                        <div class="mb-1">
                        <h1>` +
    info.name +
    `</h1> <h4> Categoria:  ` +
    info.category +
    ` </h4>

    <hr>
                        <p> ` +
    info.description +
    `</p><div class="row"> 
    
  <div class = "col"><h4> Precio: ` +
    info.cost +
    ` ` +
    info.currency +
    `</h4> </div><div type= button onclick="addToCart()" class="btn btn-success float-right w-lg-25" align="right">Comprar</div></div>` +
    `   <p> Cantidad de vendidos:  ` +
    info.soldCount +
    ` un. </p> <hr>
                        </div> 
    <div class = "row"> 

                    </div>

                    

                </div>
                

                <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1 row">
                        
    
    </p> 
                        </div> 
                    </div>

            </div>
        </div>
        `;
  document.getElementById("info-container").innerHTML = htmlContentToAppend;
}

/// DESAFIATE 3 ///

function addComment() {
  let commentInput = document.getElementById("cuerpo").value;
  let starRatingInput = document.querySelector(
    "input[name=star-rating]:checked"
  ).value;
  let loginID = localStorage.getItem("loginID");

  htmlContentToAppend =
    `        <div 
    class="list-group-item">
            <div 
            class="row">
                <div 
                class="col">
                    <div 
                    class="d-flex w-100 justify-content-between">
                        <div 
                        class="mb-1">
                        <p>` +
    loginID +
    `  ` +
    loadStarRating(starRatingInput) +
    `</p>
    
        <hr>
                        <small class="text-muted"> ` +
    commentInput +
    `
                        </div> 


                </div>
              
    </small> 
                        </div>
                     </div>  

        </div>`;

  document.getElementById("comments-container").innerHTML +=
    htmlContentToAppend;
}

///  DESAFIATE 4 ///

function loadImagesCarouselHTML(imagesArray) {
  let htmlContentPartImages =
    `
    
    <div class = "carousel-inner">
  
  <div 
  class="carousel-item active">
  <img src =" ` +
    imagesArray[0] +
    `" alt="product image" class="d-block w-100"></div>`;

  for (i = 1; i < imagesArray.length; i++) {
    let img = imagesArray[i];

    htmlContentPartImages +=
      `
     
      <div class="carousel-item">
        <img src =" ` +
      img +
      `" alt="product image" class="d-block w-100"></div>`;
  }

  htmlContentPartCarouselControl = ` <button 
    class="carousel-control-prev" 
    type="button" 
    data-bs-target="#carouselExampleIndicators" 
    data-bs-slide="prev">

    <span 
    class="carousel-control-prev-icon" 
    aria-hidden="true">
    </span>

    <span 
    class="visually-hidden">
    Previous
    </span>
  </button>
  
    <button 
    class="carousel-control-next" 
    type="button" 
    data-bs-target="#carouselExampleIndicators" 
    data-bs-slide="next">

    <span 
    class="carousel-control-next-icon" 
    aria-hidden="true">
    </span>

    <span 
    class="visually-hidden">
    Next
    </span>
  </button>`;

  htmlContentPartCarouselControl += `</div>`;

  return htmlContentPartImages + htmlContentPartCarouselControl;
}

/// DESAFIATE 5 ///

async function addToCart() {
  let preProduct = await getJSONData(urlINFO);

  let product = preProduct.data;

  let object = new Object();

  object.id = product.id;
  object.name = product.name;
  object.count = 1;
  object.unitCost = product.cost;
  object.currency = product.currency;
  object.image = product.images[0];

  let previousCart = [];

  if (localStorage.getItem("cart") === null) {
    previousCart = [];
  } else {
    previousCart = JSON.parse(localStorage.getItem("cart"));
  }

  let existingProduct = previousCart.find((p) => p.id == object.id);

  if (existingProduct != undefined) {
    existingProduct.count++;
  } else {
    previousCart.push(object);
  }

  localStorage.setItem("cart", JSON.stringify(previousCart));
}

function setProdID(id) {
  localStorage.setItem("prodID", id);
  window.location = "product-info.html";
}

function showRelatedProducts(array) {
  let htmlContentToAppend = "";

  for (let i = 0; i < array.length; i++) {
    let related = array[i];
    {
      htmlContentToAppend +=
        `
        <div onclick ="setProdID( ${related.id})" class="col list-group-item list-group-item-action cursor-active relatedProduct">
            <div class="column">
                <div class="col relatedProductImageContainer"> 
                    <img src="` +
        related.image +
        `" alt="product image" class = "relatedProductImage">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>` +
        related.name +
        ` 
                    </div>
</div>

</div>
                </div>
            </div>
        `;
    }
    document.getElementById("productos-relacionados").innerHTML =
      htmlContentToAppend;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  getJSONData(urlINFO)
    .then(function (resultObj) {
      if (resultObj.status == "ok") {
        showProductInfo(resultObj.data);
      }
    })

    .then(function () {
      getJSONData(urlCOMMENTS).then(function (resultObj) {
        if (resultObj.status == "ok") {
          showComments(resultObj.data);
          let loginID = localStorage.getItem("loginID");
          document.getElementById("loginID").text = loginID;
        }
      });
    })

    .then(function () {
      getJSONData(urlINFO).then(function (resultObj) {
        if (resultObj.status == "ok") {
          showRelatedProducts(resultObj.data.relatedProducts);
        }
      });
    });
});
