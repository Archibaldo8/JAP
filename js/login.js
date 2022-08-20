document.addEventListener("DOMContentLoaded", () => {
  regBtn.addEventListener("click", () => {
    let email = document.getElementById("floatingInput");
    let pass1 = document.getElementById("floatingPassword");

    loginValidation(email, pass1);
  });
});

function loginValidation(fields) {
for field in fieldList 

  if (!(field.value == "") {
    return alert("bienvenido rey"), redirect();
  } else {
    //   return (correo.className += " is-invalid");
    return alert("no es por ahi crack");
  }
}

// function loginWithGoogle() {

// }

function redirect() {
  window.location.href = "index-after-login.html";
}
