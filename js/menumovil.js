// selector
const menu = document.querySelector('.hamburger');

// method
function toggleMenu (event) {
  this.classList.toggle('is-active');
  document.querySelector( ".menuppal" ).classList.toggle("is_active");

  event.preventDefault();
  oscurecerFondo();
 if(!document.querySelector( ".menuppal" ).classList.contains("is_active")){
   removeFondoOscuro();
 }
}

// event
menu.addEventListener('click', toggleMenu, false, );


