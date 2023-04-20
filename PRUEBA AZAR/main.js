const btn = document.querySelector('#btn');
const img = document.querySelector('#imagen');
const informacion = document.querySelector('#informacion');
const contador = document.querySelector('#contador');
const guardar = document.querySelector('#guardar');
const resetear = document.querySelector('#resetear');
const imagenes = [
  { name: "Piche" , scientificName: "Zaedyus pichiy", imagen: './IMG/piche.jpg', dato: 'Dato 3' },
  { name: "Choique" , scientificName: "Rhea pennata pennata",  imagen: './IMG/CHOIQUE.jpg', dato: 'Dato 1' },
  { name: "Guanaco" , scientificName: "Lama guanicoe", imagen: './IMG/guanaco.jpg', dato: 'Dato 2' },
  { name: "Mara" , scientificName: "Dolichotis patagonum", imagen: './IMG/MARA.jpg', dato: 'Dato 1' },
  { name: "Chiva Andina" , scientificName: "--", imagen: './IMG/chivas.jpg', dato: 'Dato 1' },
];

let indice = 0;
let contadorImagenes = {};


const indiceGuardado = localStorage.getItem('indice');
if (indiceGuardado) {
  indice = parseInt(indiceGuardado);
}

imagenes.forEach(imagen => contadorImagenes[imagen.name] = 0);

btn.addEventListener('click', () => {
  const imagenActual = imagenes[indice];
  img.src = imagenActual.imagen;
  informacion.innerHTML = `<div class= "main__infoContainer">
    <h2> ${imagenActual.name} </h2>
    <span> Nombre cientifico: ${imagenActual.scientificName} </span>
    <span> Caracteristícas: ${imagenActual.dato} </span>
    </div>`;
  contadorImagenes[imagenActual.name]++;
  localStorage.setItem('contadorImagenes', JSON.stringify(contadorImagenes)); // Guardar en localStorage
  indice = (indice + 1) % imagenes.length;
});

guardar.addEventListener('click', () => {
  localStorage.setItem('contadorImagenes', JSON.stringify(contadorImagenes));
  alert('Estas por unirte a un grupo');
  renderizarContador();
});

resetear.addEventListener('click', () => {
  contadorImagenes = {};
  imagenes.forEach(imagen => contadorImagenes[imagen.name] = 0);
  localStorage.setItem('contadorImagenes', JSON.stringify(contadorImagenes)); // Guardar en localStorage
  renderizarContador();
});

function renderizarContador() {
  let htmlContador = '';
  for (const [nombreImagen, contadorImagen] of Object.entries(contadorImagenes)) {
    htmlContador += `
      ${nombreImagen}: <p class="contador_num"> ${contadorImagen} </p> `;
  }
  contador.innerHTML = htmlContador;
}

const contadorGuardado = localStorage.getItem('contadorImagenes');
if (contadorGuardado) {
  contadorImagenes = JSON.parse(contadorGuardado);
}

renderizarContador();