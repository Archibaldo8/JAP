const primerNombre = document.getElementById("primer-nombre");
const segundoNombre = document.getElementById("segundo-nombre");
const primerApellido = document.getElementById("primer-apellido");
const segundoApellido = document.getElementById("segundo-apellido");
const eMail = document.getElementById("email");
const telefonoContacto = document.getElementById("telefono");

const buttonUpdateUser = document.getElementById();

const USER = new Object();

function setStartingUser() {
    try {
      
    let previousUser = JSON.parse(localStorage.getItem("USER"));

    USER.firstname = previousUser.firstname;
    USER.secondname = previousUser.secondname;
    USER.firstsurname = previousUser.firstsurname;
    USER.secondsurname = previousUser.secondsurname;
    USER.email = localStorage.getItem("loginID");
    USER.contact = previousUser.contact;

    console.log(USER);
  }
  
    catch (error) {
        
    USER.firstname = "";
    USER.secondname = "";
    USER.firstsurname = "";
    USER.secondsurname = "";
    USER.email = localStorage.getItem("loginID");
    USER.contact = "";

    console.log(USER);
      
  }
}

function updateUserProfile() {
    
  USER.firstname = primerNombre.value;
  USER.secondname = segundoNombre.value;
  USER.firstsurname = primerApellido.value;
  USER.secondsurname = segundoApellido.value;
  USER.email = eMail.value;
  USER.contact = telefonoContacto.value;

  localStorage.setItem("USER", JSON.stringify(USER));
  
    console.log(USER);
}



buttonUpdateUser.addEventListener("click", () => {
  updateUserProfile();
});


document.addEventListener("DOMContentLoaded", () => {

    setStartingUser();

})
