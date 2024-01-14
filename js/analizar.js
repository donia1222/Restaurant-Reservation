

  
const video = document.createElement("video");
const canvasElement = document.getElementById("canvas");
const canvas = canvasElement.getContext("2d");
let editandoPuntos = false;
// Comprueba si ya se ha introducido el código correcto anteriormente
if (localStorage.getItem('codigoCorrecto') === 'true') {
  mostrarContenido();
}

function verificarCodigo() {
  var codigo = document.getElementById('codigo-input').value;
  
  if (codigo === '123456') { // Comprueba si el código es correcto
    localStorage.setItem('codigoCorrecto', 'true'); // Guarda en localStorage que el código es correcto
    mostrarContenido();
  } else {
    alert('El código introducido no es correcto. Inténtalo de nuevo.');
  }
}

function mostrarContenido() {
  document.getElementById('codigo-container').style.display = 'none'; // Oculta el formulario para introducir el código
  document.getElementById('contenido').classList.remove('hidden'); // Muestra el contenido de la página
}

function tick() {
  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    canvasElement.hidden = false;

    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

    var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
    var code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: "dontInvert",
    });

    if (code && !editandoPuntos) { // No mostrar puntos si se están editando
      mostrarPuntos(code.data);
    }
  }

  requestAnimationFrame(tick);
}

navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function(stream) {
  video.srcObject = stream;
  video.setAttribute("playsinline", true);
  video.play();
  requestAnimationFrame(tick);
});

function mostrarPuntos(email) {
  if (editandoPuntos) return; // Si se están editando los puntos, no actualizarlos

  $.ajax({
    type: 'POST',
    url: 'puntos/consulta_puntos.php',
    data: { email: email },
    dataType: 'json',
    success: function(response) {
      var puntosContainer = document.getElementById("puntos-container");
      puntosContainer.innerHTML = `Puntos para (${email}): ${response.puntos}`;
      document.getElementById("nuevos-puntos").value = response.puntos; // Mostrar los puntos actuales en el campo de edición
    },
    error: function(error) {
      console.error(error);
      var puntosContainer = document.getElementById("puntos-container");
      puntosContainer.innerHTML = `No se encontraron puntos para el email (${email}).`;
    }
  });
}

function editarPuntos() {
  var nuevosPuntos = document.getElementById("nuevos-puntos").value;
  var email = document.getElementById("puntos-container").innerText.match(/\(([^)]+)\)/)[1]; // Extraer el email del texto

  $.ajax({
    type: 'POST',
    url: 'puntos/editar_puntos.php',
    data: { email: email, puntos: nuevosPuntos },
    success: function(response) {
      console.log('Puntos editados correctamente:', response);
      mostrarPuntos(email);
    },
    error: function(error) {
      console.error('Error al editar los puntos:', error);
    }
  });
}

document.getElementById("nuevos-puntos").addEventListener("focus", function() {
  editandoPuntos = true; // Cuando el usuario empieza a editar los puntos, establecer editandoPuntos a true
});

document.getElementById("nuevos-puntos").addEventListener("blur", function() {
  editandoPuntos = false; // Cuando el usuario deja de editar los puntos, establecer editandoPuntos a false
  mostrarPuntos(document.getElementById("puntos-container").innerText.match(/\(([^)]+)\)/)[1]); // Actualizar los puntos una última vez
});