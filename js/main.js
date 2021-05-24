const book = document.querySelector('#bookmarked');
const der = document.querySelector('#der');
const aportes = document.querySelector('#aportes');
const mahogany = document.querySelector('#oculto');
const mahoganyReward = document.querySelector('#mahogany');
const inputRadio = document.aportes.pledge;
const botones = document.getElementsByTagName('button');
const botonesPagar = document.querySelectorAll('.pledge');
console.log(botonesPagar)
console.log(inputRadio[0].value);
console.log(botones)
console.log(aportes[1].value)
function scroll() {
  scrollOptions = {
    top: 90,
    behavior: 'smooth'
  }

  window.scrollTo(scrollOptions);
}

window.onload = function () {
  bookmarked();
  animateprogress("#barra", 80);
}


function bookmarked() {

  if (der.classList.contains("verde")) {
    der.innerHTML = `<div class="der" onclick="cambiarColor()">
        <p><svg width="56" height="56" xmlns="http://www.w3.org/2000/svg">
        <g fill="#fff" fill-rule="evenodd">
          <circle fill="hsl(176, 72%, 28%)" cx="28" cy="28" r="28" />
          <path fill="#fff" d="M23 19v18l5-5.058L33 37V19z" />
        </g>
      </svg></p> <span><a class="verde" id="bookmarked"  href="#">Bookmarked</a></span></div>
        `;
  } else {
    cambiarColor();
  }
}

function cambiarColor() {
  der.innerHTML = `<div class="der" onclick="bookmarked()">
    <p><svg width="56" height="56" xmlns="http://www.w3.org/2000/svg">
    <g fill="#fff" fill-rule="evenodd">
      <circle fill=" hsl(0, 0%, 48%)" cx="28" cy="28" r="28" />
      <path fill="#fff" d="M23 19v18l5-5.058L33 37V19z" />
    </g>
  </svg></p> <span><a class="gris" id="bookmarked"  href="#">Bookmarked</a></span></div>
    `;
}

function seleccionarAporte() {

}

function mostrarAporte(aporte) {
  aportes.classList.remove('invisible');
  scroll();
  if (aporte === 'bamboo') {
    console.log('bamboo');
    inputRadio[1].checked = true;
    botonesPagar[1].classList.remove('invisible');
  } else if (aporte === 'black') {
    console.log('black')
    inputRadio[2].checked = true;
    botonesPagar[1].classList.add('invisible');
    botonesPagar[2].classList.remove('invisible');
  } else if (aporte === 'mahogany') {
    inputRadio[0].checked = true;
    botonesPagar[1].classList.add('invisible');
    botonesPagar[2].classList.add('invisible');
    botonesPagar[0].classList.remove('invisible');
  }
}
function cerrarAporte() {
  aportes.classList.add('invisible');
}

