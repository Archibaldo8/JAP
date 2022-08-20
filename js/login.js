document.addEventListener("DOMContentLoaded", () => {
  regBtn.addEventListener("click", () => {
    let email = document.getElementById("floatingInput");
    let pass1 = document.getElementById("floatingPassword");

    loginValidation(email, pass1);
  });
});

function loginValidation(correo, pass) {
  if (!(correo.value == "") && !(pass.value == "")) {
    return alert("bienvenido rey"), redirect();
  } else {
    return alert("no es por ahi guri");
  }
}

// function loginWithGoogle() {

// }

function redirect() {
  window.location.href = "index-after-login.html";
}
