//variable base de datos
let DB;


const book = document.querySelector('#bookmarked');
const der = document.querySelector('#der');
const formulario = document.querySelector('#aportes');
const mahogany = document.querySelector('#oculto');
const mahoganyReward = document.querySelector('#mahogany');
const inputRadio = document.aportes.pledge;
const aportar = document.aportes.aportar;
const botonesPagar = document.querySelectorAll('.pledge');
const gracias = document.querySelector('.gracias');
const divNumeros = document.querySelector('#comntenedor_numeros');
// const dinero = document.querySelector('#dinero_aportado');
// const patrocinadores = document.querySelector('#patro');
// const dias = document.querySelector('#dias_restantes');
const aporteBamboo = document.querySelector('#aporte_bamboo');
const aporteBlack = document.querySelector('#aporte_black');


function scroll() {
  scrollOptions = {
    top: 300,
    behavior: 'smooth'
  }

  window.scrollTo(scrollOptions);
}

window.onload = function () {
  crearBD();
  conectarDB();
  bookmarked();
  animateprogress("#barra", 80);
  eventListener();
  //actualizar total

  //formulario.addEventListener('submit', enviarAporte);
  //enviarAporte();
}
//Conectar DB
function conectarDB() {
  // ABRIR CONEXIÓN EN LA BD:

  let abrirConexion = window.indexedDB.open('dinero', 1);

  // si hay un error, lanzarlo
  abrirConexion.onerror = function () {
    console.log('Hubo un error');
  };

  // si todo esta bien, asignar a database el resultado
  abrirConexion.onsuccess = function () {
    // guardamos el resultado
    DB = abrirConexion.result;
  };
}

function eventListener() {
  aporteBamboo.addEventListener('change', aporteDinero);
  aporteBlack.addEventListener('change', aporteDinero);
}

const dineroObj = {
  aportar: 0,
  aporte_bamboo: '',
  aporte_black: '',
  total: ''
}



function aporteDinero(e) {
  // console.log(e.target.name);
  dineroObj[e.target.name] = parseInt(e.target.value);

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


function mostrarGracias() {
  gracias.classList.remove('invisible');
}

function cerrarGracias() {
  gracias.classList.add('invisible');
  botonesPagar[0].classList.add('invisible');
  botonesPagar[1].classList.add('invisible');
  botonesPagar[2].classList.add('invisible');
  actualizarTotalBD();
  actualizarDatos();
  cerrarAporte();
  cambiarColor();
}

function enviarAporte() {
  dineroObj.aportar = parseInt(aportar[0].value);

  //Insertar registros en la BD de indexDB
  const transaction = DB.transaction(['dinero'], 'readwrite');

  dineroObj.id = Date.now();


  //Habilitar objectStore
  const objectStore = transaction.objectStore('dinero');

  //Insertar en la BD
  objectStore.add(dineroObj);

  transaction.oncomplete = function () {
    console.log('Dinero agregado');
    // Mostrar mensaje de que todo esta bien...
    console.log('Se agregó correctamente');
  }
  mostrarGracias();
}
function actualizarDatos() {
  // let total = dineroObj.aporte_black + dineroObj.aporte_bamboo;
  // console.log(total);
  // dinero.textContent = `$ ${total}`;
  obtenerDatos();
  formulario.reset();
}

function mostrarAporte() {
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
};
function cerrarAporte() {
  formulario.classList.add('invisible');
}


function crearBD() {
  //Crear la base de datos en versión 1.0
  const crearBD = window.indexedDB.open('dinero', 1);

  //Si hay un error
  crearBD.onerror = function () {
    console.log('Hubo un error');
  }

  //Si se crea correctamente
  crearBD.onsuccess = function () {
    console.log('Base de Datos Creada');
    DB = crearBD.result;

    //Mostrar citas al cargar el documento( cuando indexDB ya esta listo)
    actualizarDatos();
  }
  //Configuración de la BD
  //Definir el schema
  crearBD.onupgradeneeded = function (e) {
    const db = e.target.result;
    const objectStore = db.createObjectStore('dinero', {
      keyPath: 'id',
      autoIncrement: true
    });
    //Definir las columnas nombre, keyPath y opciones

    objectStore.createIndex('aportar', 'aportar', {
      unique: false
    });
    objectStore.createIndex('aporte_bamboo', 'aporte_bamboo', {
      unique: false
    });
    objectStore.createIndex('aporte_black', 'aporte_black', {
      unique: false
    });

    objectStore.createIndex('total', 'total', {
      unique: false
    });

    console.log('DB creada y lista');
  }


}

function obtenerDatos() {
  const abrirConexion = window.indexedDB.open('dinero', 1);

  abrirConexion.onerror = () => {
    console.log('Hubo un error');
  }

  abrirConexion.onsuccess = function () {
    DB = abrirConexion.result;
    //Leer el contenido de la BD indexDB
    const objectStore = DB.transaction('dinero').objectStore('dinero');

    //openCursor recorre los resultados de la BD
    objectStore.openCursor().onsuccess = function (e) {
      const cursor = e.target.result;
      console.log(cursor.value);
      if (cursor) {
        const {
          aportar,
          aporte_bamboo,
          aporte_black,
          total
        } = cursor.value;
        divNumeros.innerHTML = `
        <div class="contenido-numeros der">
       <h2 class="negro" id="dinero_aportado">$ ${total}</h2>
       <p>of €100,000 backed</p>
       <p class="borde"></p>
     </div>
     <div class="contenido-numeros centro">
       <h2 class="negro" id="patro">${aportar}</h2>
       <p>total backers</p>
       <p class="borde"></p>
       </div>
       <div class="contenido-numeros izq">
       <h2 class="negro" id="dias_restantes">56</h2>
       <p>days left</p>
     </div>
       `;

        cursor.continue();
      } else {

      }

    }
  }
}
function actualizarTotalBD() {
  const abrirConexion = window.indexedDB.open('dinero', 1);

  abrirConexion.onerror = () => {
    console.log('Hubo un error');
  }
  abrirConexion.onsuccess = function () {
    DB = abrirConexion.result;
    //Leer el contenido de la BD indexDB
    const transaction = DB.transaction(['dinero'], 'readwrite');
    const objectStore = transaction.objectStore('dinero');



    let aportarAct = aportar;
    let bambooAct = aporte_bamboo;
    let blackAct = aporte_black;
    let totalAct = bambooAct + blackAct;
    //     cursor.continue();
    //   }
    // }
    obtenerDatos();
    const dineroObjActualizado = {
      aportar: aportarAct,
      aporte_bamboo: bambooAct,
      aporte_black: blackAct,
      total: totalAct
    }


    objectStore.put(dineroObjActualizado);
    transaction.oncomplete = function () {
      cerrarGracias
    }
    transaction.onerror = function () {
      console.log('error');
    }


  }
}