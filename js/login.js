

function loginValidation(correo, pass) {
  if (!(correo.value == "") && !(pass.value == "")) {
    return (
      alert("bienvenido rey"),
      localStorage.setItem("loginID", correo.value),
      redirect()
    );
  } else {
    return (
      alert("no es por ahi crack"),
      (correo.className += " is-invalid"),
      (pass.className += " is-invalid")
    );
  }
}


function redirect() {
  window.location.href = "index-after-login.html";
}

// function loginWithGoogle() {
function handleCredentialResponse(response) {
  // decodeJwtResponse() is a custom function defined by you
  // to decode the credential response.
  const responsePayload = decodeJwtResponse(response.credential);

  console.log("ID: " + responsePayload.sub);
  console.log("Full Name: " + responsePayload.name);
  console.log("Given Name: " + responsePayload.given_name);
  console.log("Family Name: " + responsePayload.family_name);
  console.log("Image URL: " + responsePayload.picture);
  console.log("Email: " + responsePayload.email);
}

// }


document.addEventListener("DOMContentLoaded", () => {

    localStorage.setItem("USER", "");

  regBtn.addEventListener("click", () => {
    let email = document.getElementById("floatingInput");
    let pass1 = document.getElementById("floatingPassword");

    loginValidation(email, pass1);
    
  });
});
