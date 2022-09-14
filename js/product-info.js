const urlINFO = PRODUCT_INFO_URL + localStorage.getItem("prodID") + ".json";
const urlCOMMENTS = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("prodID") + ".json";


function imagesArray(array) {
  return array.images;
}

function loadImagesArrayHTML(imagesArray) {
  let htmlContentPart = "";
  for (i = 1; i < imagesArray.length; i++) {
    let img = imagesArray[i];

    htmlContentPart +=
      `<div class="column secondaryImage">
        <img src =" ` +
      img +
      `" alt="product image" class="img-thumbnail"></div>`;
  }
  return htmlContentPart;
}

function showComments() {
  let htmlContentToAppend = "";

  let comments = currentComments;

  htmlContentToAppend +=
    `
        <div class="list-group-item">
            <div class="row">
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h1>` +
    comments.user +
    `</h1>

    <hr>
                        <p> ` +
    comments.description + `
                        </div> 

                    

                </div>
                

                <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1 row">
                        
    <div class = "row">
    </p> 
                        </div>
                     </div>  

        </div>
        `;
  document.getElementById("comments-container").innerHTML = htmlContentToAppend;
}

function showProductInfo() {
  let htmlContentToAppend = "";

  let info = currentInfo;

  htmlContentToAppend +=
    `
        <div class="list-group-item">
            <div class="row">
                <div class="col-lg-4 center'div">
                    <img src="` +
    info.images[0] +
    `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h1>` +
    info.name +
    `</h1> <h4> Categoria:  ` +
    info.category +
    ` </h4>

    <hr>
                        <p> ` +
    info.description +
    `</p> <h4> Precio: ` +
    info.cost +
    ` ` +
    info.currency +
    ` </h4> <p> Cantidad de vendidos:  ` +
    info.soldCount +
    ` un. </p> <hr>
                        </div> 
    <div class = "row"> 

                    </div>

                    

                </div>
                

                <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1 row">
                        
    <div class = "row">` +
    loadImagesArrayHTML(info.images) +
    `</div>
    </p> 
                        </div> 
                    </div>

            </div>
        </div>
        `;
  document.getElementById("info-container").innerHTML = htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", function () {


  getJSONData(urlINFO)
    .then(function (resultObj) {
      let currentInfo
      if (resultObj.status == "ok") {
        currentInfo = resultObj.data;
      };
    })
    // .then(
    //   getJSONData(urlCOMMENTS)
    //     .then(function (resultComments) {
    //       let currentComments
    //       if (resultComments.status == "ok") {
    //         currentComments = resultComments.data;
    //       }
    //     })
    // );
    
    
      showProductInfo(currentInfo)
  // showComments(currentComments)

  let loginID = localStorage.getItem("loginID");
  document.getElementById("loginID").text = loginID;
  console.log(imagesArray(currentInfo)[0]);
  console.log("puto");
  console.log(loadImagesArrayHTML(currentInfo.images)) 
 

});
