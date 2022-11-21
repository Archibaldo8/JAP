const primerNombre = document.getElementById("primer-nombre");
const segundoNombre = document.getElementById("segundo-nombre");
const primerApellido = document.getElementById("primer-apellido");
const segundoApellido = document.getElementById("segundo-apellido");
const eMail = document.getElementById("email");
const telefonoContacto = document.getElementById("telefono");
const imagenPerfilArchivo = document.getElementById("imagen-perfil-archivo");
const imagenPerfilVisible = document.getElementById("imagen-perfil-visible");

const forms = document.querySelectorAll(".needs-validation");

const buttonUpdateUser = document.getElementById("guardar-cambios");

const USER = new Object();

// Usuario inicial

function setStartingUser() {
  try {
    let previousUser = JSON.parse(localStorage.getItem("USER"));

    USER.firstname = previousUser.firstname;
    primerNombre.value = previousUser.firstname;

    USER.secondname = previousUser.secondname;
    segundoNombre.value = previousUser.secondname;

    USER.firstsurname = previousUser.firstsurname;
    primerApellido.value = previousUser.firstsurname;

    USER.secondsurname = previousUser.secondsurname;
    segundoApellido.value = previousUser.secondsurname;

    USER.email = previousUser.email;
    eMail.value = previousUser.email;

    USER.contact = previousUser.contact;
    telefonoContacto.value = previousUser.contact;

    USER.profileImage = previousUser.profileImage;

    if (previousUser.profileImage != undefined) {
      imagenPerfilVisible.src = previousUser.profileImage;
    } else {
      imagenPerfilVisible.src = "img/img-placeholder.jpg";
    }

    console.log(USER);
  } catch (error) {
    USER.firstname = "";
    USER.secondname = "";
    USER.firstsurname = "";
    USER.secondsurname = "";
    USER.email = localStorage.getItem("loginID");
    USER.contact = "";
    USER.profileImage = "img/img-placeholder.jpg";

    eMail.value = localStorage.getItem("loginID");

    console.log(USER);
  }
}

// Validacion de campos

Array.prototype.slice.call(forms).forEach(function (form) {
  form.addEventListener(
    "submit",
    function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();
        document.getElementsByClassName("alert")[0].classList.remove("d-none");
        updateUserProfile();

        setTimeout(function () {
          window.location.reload();
        }, 2000);
      }

      form.classList.add("was-validated");
    },
    false
  );
});

function updateUserProfile() {
  readImageFile(imagenPerfilArchivo);

  console.log(localStorage.get);

  USER.firstname = primerNombre.value;
  USER.secondname = segundoNombre.value;
  USER.firstsurname = primerApellido.value;
  USER.secondsurname = segundoApellido.value;
  USER.email = eMail.value;
  USER.contact = telefonoContacto.value;
  USER.profileImage = localStorage.getItem("imagenPerfilBase64");

  localStorage.setItem("loginID", eMail.value);

  localStorage.setItem("USER", JSON.stringify(USER));

  console.log(USER);
}

/// DESAFIATE 7 ///

function readImageFile(fileInput) {
  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    console.log(reader.result);
    localStorage.setItem("imagenPerfilBase64", reader.result);
    imagenPerfilVisible.src = reader.result;
  });
  reader.readAsDataURL(file);
}

document.addEventListener("DOMContentLoaded", () => {
  setStartingUser();
});
