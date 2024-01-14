
var qrcode; // Declarar el objeto QRCode fuera de la función para poder reutilizarlo

// Recuperar email guardado al cargar la página
document.addEventListener('DOMContentLoaded', (event) => {
  var emailGuardado = localStorage.getItem('email');
  if (emailGuardado) {
    document.getElementById("email-input").value = emailGuardado;
    verPuntos();
  }
});

function verPuntos() {
var email = document.getElementById("email-input").value;

// Verificar que el campo de entrada no esté vacío antes de continuar
if (email.trim() === "") {
alert("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
return;
}

// Guardar el email ingresado en el almacenamiento local del navegador
localStorage.setItem('email', email);

// Enviar una solicitud AJAX al archivo consulta_puntos.php para obtener los puntos
$.ajax({
type: 'POST',
url: 'puntos/consulta_puntos.php',
data: { email: email },
dataType: 'json',
success: function(response) {
  mostrarPuntos(email, response.puntos); // Agregar email como argumento
  generarQR(email); // Llamar a la función para generar el código QR con el email
  if (response.puntos >= 100 && response.puntos < 200) {
    mostrarVerificarEmailBtn();
  }
},
error: function(error) {
  console.error(error);
  mostrarPuntos(email, 0); // Puedes cambiar el 0 por un valor predeterminado de puntos si lo deseas
  generarQR(email); // Llamar a la función para generar el código QR con el email
}
});
}

// Agregar un evento para verificar el campo de entrada de correo electrónico
document.getElementById("email-input").addEventListener("input", function() {
var emailInput = document.getElementById("email-input");
var verPuntosBtn = document.getElementById("ver-puntos-btn");

if (emailInput.value.trim() === "") {
// Si el campo está vacío o contiene solo espacios en blanco, deshabilitar el botón
verPuntosBtn.disabled = true;
} else {
// Si el campo contiene algún texto, habilitar el botón
verPuntosBtn.disabled = false;
}
});


function mostrarPuntos(email, puntos) {
var puntosContainer = document.getElementById("puntos-container");
puntosContainer.innerHTML = ""; // Limpiar el contenedor

// Mostrar mensajes según puntos acumulados
if(puntos >= 100 && puntos < 200) {
    var mensajeDescuento = document.createElement("div");
    mensajeDescuento.innerHTML = "Du hast deinen ersten Rabatt von 50 Franken gewonnen! Zeige uns beim nächsten Besuch im Restaurant deinen QR-Code.";
    puntosContainer.appendChild(mensajeDescuento);
} else if (puntos >= 200) {
    var mensajeDescuento = document.createElement("div");
    mensajeDescuento.innerHTML = "Wunderbar! Du hast einen Rabatt von 100 Franken gewonnen. Zeige uns beim nächsten Besuch im Restaurant deinen QR-Code.";
    puntosContainer.appendChild(mensajeDescuento);
}

// Crear 10 círculos
for (var i = 0; i < 10; i++) {
    var circulo = document.createElement("div");
    
    // Si es el décimo círculo, mostrar un regalo
    if (i == 9) {
        circulo.classList.add("circulo-regalo");
        if (puntos < 100) {
            circulo.classList.add("circulo-regalo-no-alcanzado");
        } else {
            circulo.classList.add("circulo-regalo-alcanzado");
        }
    } else if (i < Math.floor(puntos / 10)) {
        // Círculos llenos
        circulo.classList.add("circulo-lleno");
        circulo.textContent = "10";
    } else {
        // Círculos vacíos
        circulo.classList.add("circulo-vacio");
    }

    puntosContainer.appendChild(circulo);
}

// Mostrar el total de puntos y el email
var totalPuntosElemento = document.createElement("p");
totalPuntosElemento.textContent = "" + puntos + " Punkte";
totalPuntosElemento.className = "puntos-box"; // Agrega una clase al elemento

var emailElemento = document.createElement("p");
emailElemento.textContent = email;

var puntosContainer = document.getElementById("puntos-container");
puntosContainer.appendChild(totalPuntosElemento);
puntosContainer.appendChild(emailElemento);

}


function generarQR(email) {
var qrcodeContainer = document.getElementById("qrcode-container");

if (qrcode) {
    // Si ya existe un objeto QRCode, simplemente actualizar su contenido
    qrcode.clear(); // Limpiar el código QR antiguo
    qrcode.makeCode(email); // Generar el nuevo código QR
} else {
    // Si no existe un objeto QRCode, crear uno nuevo
    qrcode = new QRCode(qrcodeContainer, {
        text: email,
        width: 128,
        height: 128
    });
}
}

function mostrarVerificarEmailBtn() {
var puntosContainer = document.getElementById("puntos-container");

// Crea el párrafo
var verificarEmailTxt = document.createElement("p");
verificarEmailTxt.textContent = "Bestätige deine E-Mail-Adresse nur, wenn du den QR-Code im Restaurant vorzeigst";
verificarEmailTxt.style.fontSize = "14px"; // Cambia el tamaño del texto a 16px
verificarEmailTxt.style.color = "#ffeb3b"; // Cambia el color del texto a #666666
puntosContainer.appendChild(verificarEmailTxt);  // Añade el párrafo al contenedor

var verificarEmailBtn = document.createElement("button");
verificarEmailBtn.id = "verificarEmailBtn";
verificarEmailBtn.textContent = "E-Mail bestätigen";
verificarEmailBtn.onclick = function() {
solicitarCodigo();
};
puntosContainer.appendChild(verificarEmailBtn);  // Añade el botón al contenedor
}

function solicitarCodigo() {
  var email = document.getElementById("email-input").value;
  $.ajax({
    type: 'POST',
    url: 'puntos/enviar_codigo_verificacion.php',
    data: { email: email },
    dataType: 'text',
    success: function(response) {
      alert(response); // Mostrar mensaje de éxito o error del envío del código
      mostrarCodigoInput();
    },
    error: function(error) {
      console.error(error);
      alert("Error al enviar el código de verificación.");
    }
  });
}

function mostrarCodigoInput() {
  var puntosContainer = document.getElementById("puntos-container");
  var codigoContainer = document.createElement("div");
  codigoContainer.id = "codigo-container";
  codigoContainer.innerHTML = `
    <label for="codigo-input">Geben Sie den 4-stelligen Code ein:</label>
    <input type="tel" id="codigo-input" pattern="\d{4}" maxlength="4" placeholder="Code">
    <button onclick="verificarCodigo()">Senden</button>
  `;
  puntosContainer.appendChild(codigoContainer);
}

function verificarCodigo() {
var codigoInput = document.getElementById("codigo-input").value;
$.ajax({
    type: 'POST',
    url: 'puntos/verificar_codigo.php',
    data: { codigo: codigoInput },
    dataType: 'text',
    success: function(response) {
        alert(response); // Mostrar mensaje de éxito o error de verificación del código
        if (response === "Verifizierungscode korrekt.") {
            var puntosContainer = document.getElementById("puntos-container");
            var verificarEmailBtn = document.getElementById("verificarEmailBtn");
            puntosContainer.removeChild(verificarEmailBtn);

            var codigoContainer = document.getElementById("codigo-container");
            puntosContainer.removeChild(codigoContainer);

            var emailInput = document.getElementById("email-input");
            emailInput.disabled = true;

            var emailVerifiedText1 = document.createElement("div");
            emailVerifiedText1.style.textAlign = "center";
            emailVerifiedText1.style.marginTop = "20px";
            emailVerifiedText1.style.color = "#95e22d"; // Se cambia el color del texto aquí
            emailVerifiedText1.textContent = "Email überprüft! ";
            puntosContainer.appendChild(emailVerifiedText1);

            var emailVerifiedText2 = document.createElement("div");
            emailVerifiedText2.style.textAlign = "center";
            emailVerifiedText2.style.color = "white"; // Se cambia el color del texto aquí
            emailVerifiedText2.textContent = "Zeigen Sie diese Nachricht zusammen mit Ihrem QR-Code vor:";
            puntosContainer.appendChild(emailVerifiedText2);
        }
    },
    error: function(error) {
        console.error(error);
        alert("Verifizierung des Bestätigungscodes fehlgeschlagen.");
    }
});
}

// JavaScript para abrir y cerrar el modal
var modal = document.getElementById("myModal");
var btn = document.createElement("i");
btn.classList.add("fas", "fa-question-circle"); // Agregar clases del icono de interrogación
btn.addEventListener("click", function() {
modal.style.display = "block";
});
document.body.appendChild(btn);

var span = document.getElementsByClassName("close")[0];
span.addEventListener("click", function() {
modal.style.display = "none";
});

window.addEventListener("click", function(event) {
if (event.target === modal) {
modal.style.display = "none";
}
});

// Verificar si el modal ya ha sido mostrado antes
window.addEventListener("DOMContentLoaded", function() {
var modalShown = localStorage.getItem("modalShown");
if (!modalShown) {
modal.style.display = "block";
// Marcar el modal como mostrado en el almacenamiento local
localStorage.setItem("modalShown", true);
}
});

function mostrarLottieAnimacion() {
var lottieContainer = document.getElementById("lottie-container");

var animation = lottie.loadAnimation({
container: lottieContainer,
renderer: 'svg',
loop: false, // Si quieres que se repita, coloca true.
autoplay: true,
path: 'https://lottie.host/15e8beb5-2c73-4447-8dd0-8ab3f7f0ce47/l9g59kNmzY.json' // Aquí debes poner la ruta a tu archivo JSON de Lottie.
});

// Hacer que el contenedor sea visible
lottieContainer.style.display = "block";

// Ocultar el Lottie después de 3 segundos
setTimeout(function() {
lottieContainer.style.display = "none";
animation.destroy(); // Esto es opcional pero ayuda a liberar recursos
}, 3000);
}

// Ahora, dentro de tu función donde manejas los puntos, puedes llamar a mostrarLottieAnimacion() cuando sea necesario:

if ((totalPuntos % 100) === 0) { // Si totalPuntos es múltiplo de 100
mostrarLottieAnimacion();
}


