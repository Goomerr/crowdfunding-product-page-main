const book = document.querySelector('#bookmarked');
const der = document.querySelector('#der');
const formulario = document.querySelector('#form');
const mahogany = document.querySelector('#oculto');
const mahoganyReward = document.querySelector('#mahogany');
const inputRadio = document.aportes.pledge;
const patrocinar = document.querySelector('#patrocinador');
const botonesPagar = document.querySelectorAll('.pledge');
const gracias = document.querySelector('.gracias');
const divNumeros = document.querySelector('#comntenedor_numeros');
const aporteBamboo = document.querySelector('#aporte_bamboo');
const aporteBlack = document.querySelector('#aporte_black');

let recaudacion = [];
let patrocinadores = [];

//cuenta atrás variables
const end = new Date('09/31/2021 12:00 AM');

const _second = 1000;
const _minute = _second * 60;
const _hour = _minute * 60;
const _day = _hour * 24;
let timer;
let now = new Date();
let distance = end - now;
let days = Math.floor(distance / _day);
// let hours = Math.floor((distance % _day) / _hour);
// let minutes = Math.floor((distance % _hour) / _minute);
// let seconds = Math.floor((distance % _minute) / _second);


function scroll() {
  scrollOptions = {
    top: 300,
    behavior: 'smooth'
  }

  window.scrollTo(scrollOptions);
}

window.onload = function () {
  cuentaAtras();
  mostrarHtml();
  bookmarked();

}
function guardarPatros() {
  patrocinadores = [...patrocinadores, parseInt(patrocinar.value)];
  localStorage.setItem('patrocinadores', JSON.stringify(patrocinadores));
  mostrarGracias();
  mostrarHtml();
  cerrarCheck();
  cambiarColor();
}

function guardarDinero() {
  let bamboo = aporteBamboo.value;
  let black = aporteBlack.value;
  let total = bamboo + black;
  if (total === '') {
    alert('Ingresa una cantidad');
    return;
  }
  patrocinadores = [...patrocinadores, parseInt(patrocinar.value)];
  recaudacion = [...recaudacion, parseInt(total)];
  if (recaudacion === '' || patrocinadores === '') {
    recaudacion = 0;
    patrocinadores = 0;
  }
  localStorage.setItem('patrocinadores', JSON.stringify(patrocinadores));
  localStorage.setItem('total', JSON.stringify(recaudacion));
  formulario.reset();

  mostrarGracias();

  mostrarHtml();
  cerrarCheck();
}



function mostrarHtml() {
  cerrarCheck();
  // cerrarAporte();
  recaudacion = JSON.parse(localStorage.getItem('total'));
  patrocinadores = JSON.parse(localStorage.getItem('patrocinadores'));
  let progresoBarra = recaudacion.reduce((c, d) => c + d, 0) / 1000;
  animateprogress("#barra", progresoBarra);

  divNumeros.innerHTML = `
            <div class="contenido-numeros der">
           <h2 class="negro" id="dinero_aportado">$ ${recaudacion.reduce((a, b) => a + b, 0)}</h2>
           <p>of $100,000 backed</p>
           <p class="borde"></p>
         </div>
         <div class="contenido-numeros centro">
           <h2 class="negro" id="patro">${patrocinadores.reduce((c, d) => c + d, 0)}</h2>
           <p>total backers</p>
           <p class="borde"></p>
           </div>
           <div class="contenido-numeros izq">
           <h2 class="negro" id="dias_restantes">${days}</h2>
           <p>days left</p>
         </div>
           `;

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
  </svg></p> <span><a class="gris" id="bookmarked"  href="#">Bookmark</a></span></div>
    `;
}


function mostrarGracias() {
  oscurecerFondo();

  gracias.classList.remove('invisible');
}

function cerrarGracias() {
  cerrarAporte();
  gracias.classList.add('invisible');
  botonesPagar[0].classList.add('invisible');
  botonesPagar[1].classList.add('invisible');
  botonesPagar[2].classList.add('invisible');
  removeFondoOscuro();
  cambiarColor();

}



function mostrarAporte() {
  oscurecerFondo();
  formulario.classList.remove('invisible');
  scroll();
  mostrarCheck();
}
function mostrarCheck() {
  if (inputRadio[1].checked === true) {
    botonesPagar[1].classList.remove('invisible');
    botonesPagar[0].classList.add('invisible');
  } else if (inputRadio[2].checked === true) {
    botonesPagar[1].classList.add('invisible');
    botonesPagar[2].classList.remove('invisible');
    botonesPagar[0].classList.add('invisible');
  } else if (inputRadio[0].checked === true) {
    botonesPagar[1].classList.add('invisible');
    botonesPagar[2].classList.add('invisible');
    botonesPagar[0].classList.remove('invisible');
  }
}
function cerrarCheck() {
  inputRadio[0].checked = false;
  botonesPagar[0].classList.add('invisible');
  botonesPagar[1].classList.add('invisible');
  botonesPagar[2].classList.add('invisible');
}

function cerrarAporte() {

  cerrarCheck();
  formulario.classList.add('invisible');
  removeFondoOscuro();

}



function cuentaAtras() {
  if (distance < 0) {

    clearInterval(timer);
    document.getElementById('dias_restantes').innerHTML = 'FINAL!';

    return;
  }
  //document.getElementById('dias_restantes').innerHTML = days;
  // document.getElementById('dias_restantes').innerHTML += hours + ' horas, ';
  // document.getElementById('dias_restantes').innerHTML += minutes + ' minutos y ';
  // document.getElementById('dias_restantes').innerHTML += seconds + ' segundos';
}

timer = setInterval(cuentaAtras, 1000);

const overlay = document.createElement('div');
const imagen = document.createElement('img');
function oscurecerFondo() {
  overlay.appendChild(imagen);
  overlay.classList.add('overlay');
  const body = document.querySelector('body');
  body.appendChild(overlay);


}

function removeFondoOscuro() {

  overlay.remove();

}

