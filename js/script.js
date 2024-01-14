
var fechaSeleccionada = "";
var horaSeleccionada = "";
var personas = "";
var nombre = "";
var email = "";
var telefono = "";

// Crea un conjunto para almacenar las fechas bloqueadas
var fechasBloqueadas = new Set();

// Al cargar la página, realiza una solicitud al servidor para obtener la lista de fechas bloqueadas
fetch('php/obtenerFechasBloqueadas.php')
    .then(response => response.json())
    .then(data => {
        // Añade cada fecha bloqueada al conjunto
        data.forEach(fecha => {
            fechasBloqueadas.add(fecha);
        });

        // Añade el rango de fechas del 1 al 15 de agosto al conjunto de fechas bloqueadas
        var startDate = new Date("2023-08-01");
        var endDate = new Date("2023-08-15");

        for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
            fechasBloqueadas.add($.datepicker.formatDate("yy-mm-dd", d));
        }
    });

$(function() {
    $("#datepicker").datepicker({
    minDate: 0,
    dateFormat: "dd-mm-yy",  // <--- Aquí está el cambio
    beforeShowDay: function(date) {
        var day = date.getDay();
        var stringDate = $.datepicker.formatDate("yy-mm-dd", date);

        // Comprueba si la fecha está en el conjunto de fechas bloqueadas o si es domingo (0) o lunes (1)
        var isBlocked = fechasBloqueadas.has(stringDate) || day === 0 || day === 1;
        return [!isBlocked];
    },
onSelect: function(dateText) {
    fechaSeleccionada = dateText;
    document.getElementById("reserva").style.display = "none";
    document.getElementById("fecha-seleccionada").innerText = "Ausgewähltes Datum: " + fechaSeleccionada;
    var parts = dateText.split('-');
    var formattedDate = parts[1] + '/' + parts[0] + '/' + parts[2];
    var dayOfWeek = new Date(formattedDate).getDay();
    if (dayOfWeek === 2 || dayOfWeek === 6) {
        actualizarModalHorarios(['18:00', '18:30', '19:00', '19:30', '20:00']);
    } else {
        actualizarModalHorarios(['11:30', '12:00', '13:00', '18:00', '18:30', '19:00', '19:30', '20:00']);
    }
    abrirModal();
}
});

    // Verificar si existen datos guardados en el almacenamiento local
    if (localStorage.getItem("nombre") && localStorage.getItem("email") && localStorage.getItem("telefono")) {
        // Llenar los campos de contacto con los datos guardados
        document.getElementById("nombre-input").value = localStorage.getItem("nombre");
        document.getElementById("email-input").value = localStorage.getItem("email");
        document.getElementById("telefono-input").value = localStorage.getItem("telefono");
    }


});

function actualizarModalHorarios(horarios) {
    var modalContent = '';
    for (var i = 0; i < horarios.length; i++) {
        modalContent += `<button onclick="seleccionarHora('${horarios[i]}')">${horarios[i]}</button>`;
    }
    document.getElementById("modal-content").innerHTML = modalContent;
}

    function volverPaso1() {
      document.getElementById("paso2").style.display = "none";
      document.getElementById("reserva").style.display = "block";
    }

    function abrirModal() {
      document.getElementById("modal-overlay").style.display = "block";
    }

function cerrarModalHorarios() {
  document.getElementById("modal-overlay").style.display = "none";
  document.getElementById("abrir-modal-btn").style.display = "block";
  document.getElementById("paso2").style.display = "block";
}

function seleccionarHora(hora) {
  horaSeleccionada = hora;
  document.getElementById("hora-input").value = hora;
  document.getElementById("hora-seleccionada").innerText = "Ausgewählte Zeit: " + horaSeleccionada;
  document.getElementById("modal-overlay").style.display = "none";
  mostrarModalPersonas();
}
function mostrarModalPersonas() {
  document.getElementById("modal-personas-overlay").style.display = "block";
}


    function siguientePaso2Nuevo() {
      document.getElementById("paso2").style.display = "none";
      document.getElementById("paso3").style.display = "block";
    }

    function volverPaso2() {
      document.getElementById("paso3").style.display = "none";
      document.getElementById("paso2").style.display = "block";
    }

    // Agrega este código dentro de la función siguientePaso3()
   function abrirModalPersonas() {
      document.getElementById("modal-personas-overlay").style.display = "block";
    }

    // Function to close the modal for selecting the number of people
    function cerrarModalPersonas() {
      document.getElementById("modal-personas-overlay").style.display = "none";
      document.getElementById("paso3").style.display = "block";
    }

    // Function to select the number of people and proceed to the next step
    function seleccionarPersonas(cantidad) {
      personas = cantidad;
      document.getElementById("personas-input").value = personas;
      document.getElementById("personas-seleccionadas").innerText = `ANZAHL DER PERSONEN: ${personas}`;

      if (personas >= 16) {
        mostrarModalTelefono();
      } else {
        document.getElementById("modal-personas-overlay").style.display = "none";
        document.getElementById("paso3").style.display = "none";
        document.getElementById("paso4").style.display = "block";
      }
    }


// Agrega esta función después de la función siguientePaso3()
function mostrarModalTelefono() {
  document.getElementById("telefono-modal-overlay").style.display = "block";
  setTimeout(function() {
    document.getElementById("telefono-modal-overlay").style.display = "none";
  }, 5000);
}


    function volverPaso3() {
      document.getElementById("paso4").style.display = "none";
      document.getElementById("paso3").style.display = "block";
    }

    function generarNumeroReserva() {
      var numeroReserva = Math.floor(Math.random() * 900000) + 100000; // Generar número aleatorio de 6 dígitos
      return numeroReserva;
    }
	  
	  
function guardarDatosContacto() {
      // Obtener los valores de los campos de contacto
      var nombre = document.getElementById("nombre-input").value;
      var email = document.getElementById("email-input").value;
      var telefono = document.getElementById("telefono-input").value;

      // Guardar los datos en el almacenamiento local del navegador
      localStorage.setItem("nombre", nombre);
      localStorage.setItem("email", email);
      localStorage.setItem("telefono", telefono);
    }
function addToCalendar(fecha, hora, nombre) {
    // Convertir la fecha al formato necesario
    var fechaMoment = moment(fecha, "DD-MM-YYYY");  // Interpretar la fecha como día-mes-año
    var formatoFecha = fechaMoment.format('YYYYMMDD');

    var formatoHoraInicio = moment(hora, 'HH:mm').format('HHmmss');
    var formatoHoraFin = moment(hora, 'HH:mm').add(2, 'hours').format('HHmmss'); 

    var titulo = `Reservierung bei Cantina Tex-Mex für ${nombre}`;
    var detalles = `Sie haben eine Reservierung vorgenommen ${fecha} um ${hora}`;

    var urlGoogleCalendar = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(titulo)}&details=${encodeURIComponent(detalles)}&dates=${formatoFecha}T${formatoHoraInicio}Z/${formatoFecha}T${formatoHoraFin}Z`;

    var urlAppleCalendar = `data:text/calendar;charset=utf-8,${encodeURIComponent(`
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${titulo}
DESCRIPTION:${detalles}
DTSTART:${formatoFecha}T${formatoHoraInicio}
DTEND:${formatoFecha}T${formatoHoraFin}
END:VEVENT
END:VCALENDAR
`)}`;

    var isAppleDevice = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);

    if (isAppleDevice) {
        window.location.href = urlAppleCalendar; 
    } else {
        window.open(urlGoogleCalendar, '_blank');
    }
}
function mostrarMensajeConfirmacion(email, puntos) {
  var nombre = document.getElementById("nombre-input").value;
  var telefono = document.getElementById("telefono-input").value;
  var numeroReserva = generarNumeroReserva();

  document.getElementById("paso4").style.display = "none";
  document.getElementById("info-seleccionada").style.display = "none"; // Ocultar el contenedor de información de reserva
  document.getElementById("confirmacion").style.display = "block";

  // Agregar los puntos a la información de reserva (mostrando los puntos para el email primero)
  var detallesReserva = document.getElementById("detalles-reserva");
  detallesReserva.innerText =
    `${puntos} Punkte für: (${email})\nReservierungsnummer: ${numeroReserva}\nDatum: ${fechaSeleccionada}\nUhrzeit: ${horaSeleccionada}\nPersonen: ${personas}\nName: ${nombre}\nTelefon: ${telefono}`;

  // Definir las variables con las URLs de editar_reserva.php y eliminar_reserva.php
  var enlaceEditar = 'php/editar_reserva.php?email=' + encodeURIComponent(email);
  var enlaceEliminar = 'php/eliminar_reserva.php?email=' + encodeURIComponent(email);

  // Agregar los enlaces de "Editar Reserva" y "Cancelar Reserva"
  var enlaceEditarHTML = '<p> <a href="' + enlaceEditar + '">Reservierung bearbeiten</a></p>';
  var enlaceEliminarHTML = '<p> <a href="' + enlaceEliminar + '">Reservierung stornieren</a></p>';
  detallesReserva.innerHTML += enlaceEditarHTML + enlaceEliminarHTML;

  document.getElementById("confirmation-animation-container").style.display = "block";

  // Verificar si ya existe un botón de "Añadir al calendario"
  var existingButton = document.getElementById("addToCalendarButton");
  if (!existingButton) {
    // Si no existe un botón, entonces lo creamos y lo agregamos al área de confirmación
    var addToCalendarButton = document.createElement("button");
    addToCalendarButton.id = "addToCalendarButton"; // Agregamos un ID para identificarlo fácilmente si necesitamos modificarlo posteriormente
    addToCalendarButton.innerHTML = '<span class="fas fa-calendar-plus"></span> Zu meinem Kalender hinzufügen';
    addToCalendarButton.onclick = function () {
      addToCalendar(fechaSeleccionada, horaSeleccionada, nombre);
    };
    document.getElementById("confirmacion").appendChild(addToCalendarButton);
  }

  // Show the "miBoton" button when the reservation confirmation is shown
  document.getElementById("miBoton").style.display = "block";

  // Ocultar el mensaje de confirmación y la animación Lottie después de unos segundos (ajusta el tiempo según sea necesario)
  setTimeout(function () {
    document.getElementById("confirmacion").style.display = "none";
    document.getElementById("confirmation-animation-container").style.display = "none";
    // Hide the "miBoton" button when the confirmation message disappears
    document.getElementById("miBoton").style.display = "none";
  }, 300000); // La animación se mostrará durante 3 segundos

  guardarDatosContacto();
}


function obtenerPuntos(email) {
  $.ajax({
    type: 'POST', // Cambiar a 'POST'
    url: 'puntos/consulta_puntos.php',
    data: { email: email },
    dataType: 'json', // Especificar que se espera recibir datos en formato JSON
    success: function(response) {
      // Cuando se reciba la respuesta del servidor (los puntos), mostrar el mensaje de confirmación
      mostrarMensajeConfirmacion(email, response.puntos); // Obtener el valor de puntos desde la respuesta
    },
    error: function(error) {
      // Si hay un error al obtener los puntos, mostrar el mensaje de confirmación sin puntos
      console.error(error);
      mostrarMensajeConfirmacion(email, 0); // Puedes cambiar el 0 por un valor predeterminado de puntos si lo deseas
    }
  });
}

function confirmarReserva() {
  var nombre = document.getElementById("nombre-input").value;
  var email = document.getElementById("email-input").value;
  var telefono = document.getElementById("telefono-input").value;

    if (nombre === "" || email === "" || telefono === "") {
        alert("Sie müssen alle Kontaktfelder ausfüllen.");
        
        // Redirige al usuario a la URL especificada
        window.location.href = "https://www.google.com";
        return;
    }

  var numeroReserva = generarNumeroReserva();
  document.getElementById("paso4").style.display = "none";
  document.getElementById("info-seleccionada").style.display = "none"; // Ocultar el contenedor de información de reserva
  document.getElementById("confirmacion").style.display = "block";

  document.getElementById("detalles-reserva").innerText =
    `Reservierungsnummer: ${numeroReserva}\nDatum: ${fechaSeleccionada}\nUhrzeit: ${horaSeleccionada}\nPersonen: ${personas}\nName: ${nombre}\nEmail: ${email}\nTelefon: ${telefono}`;

  document.getElementById("confirmation-animation-container").style.display = "block";

  // Obtener el email ingresado por el usuario
  var email = document.getElementById("email-input").value;

  // Llamar a la función para obtener los puntos
  obtenerPuntos(email);
}

document.getElementById('reserva-form').addEventListener('submit', function(event) {
  event.preventDefault();

  var formData = $('#reserva-form').serialize(); // Esto recoge todos los datos del formulario

  // Enviar datos al script PHP de correo electrónico
  $.ajax({
    type: 'POST',
    url: 'php/enviar_email.php',
    data: formData,
    success: function(response) {
      // Aquí puedes manejar la respuesta del servidor
      console.log(response);
    },
    error: function(error) {
      // Aquí puedes manejar los errores
      console.error(error);
    }
  });

  // Enviar datos al script PHP de la base de datos
  $.ajax({
    type: 'POST',
    url: 'php/confing.php',
    data: formData,
    success: function(response) {
      // Aquí puedes manejar la respuesta del servidor
      console.log(response);
      
      // Una vez que los puntos se han actualizado en la base de datos, entonces obtenemos los puntos
      // Obtener el email ingresado por el usuario
      var email = document.getElementById("email-input").value;

      // Llamar a la función para obtener los puntos
      obtenerPuntos(email);
    },
    error: function(error) {
      // Aquí puedes manejar los errores
      console.error(error);
    }
  });
});


        // Obtener el botón por su ID
        const boton = document.getElementById('miBoton');

        // Agregar un evento de clic al botón
        boton.addEventListener('click', function() {
            // Aquí debes reemplazar 'https://reservierung.cantinatexmex.ch' con el enlace que deseas abrir
            window.location.href = 'https://reservierung.cantinatexmex.ch';
        });

    $(document).ready(function() {
      $(document).on('gesturestart', function(e) {
        e.preventDefault();
      });
    });

    // Función para cerrar el modal
    function cerrarModalMensaje() {
      document.getElementById('modal').style.display = 'none';
    }

    // Obtener los datos del modal al cargar la página
    window.onload = function() {
      fetch('php/obtenerModal.php')
        .then(response => response.json())
        .then(data => {
          if (data.estado_modal == 1) {
            // Si el estado del modal es 1, mostrar el modal
            document.getElementById('modal-message').innerText = data.mensaje_modal;
            document.getElementById('modal').style.display = 'block';

            // Configurar el modal para cerrarse después de 5 segundos
            setTimeout(cerrarModalMensaje, 8000);  // 4000 milisegundos = 4 segundos
          }
        })
        .catch(error => console.error(error));
    };

    // Betriebssystem erkennen
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    var os;
    var deferredPrompt; // Um das Installationsereignis zu speichern

    if (/android/i.test(userAgent)) {
      os = "Android";
    }

    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      os = "iOS";
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      // Verhindert, dass Chrome die Installationsaufforderung anzeigt
      e.preventDefault();
      // Speichert das Ereignis, um es später zu verwenden
      deferredPrompt = e;
    });

    // Die Benachrichtigung anzeigen
    var notification = document.getElementById('install-notification');
    var message = document.getElementById('install-message');
    var instructions = document.getElementById('install-instructions');
    var installBtn = document.getElementById('install-btn');
    var closeBtn = document.getElementById('close-btn');
    var showNotificationBtn = document.getElementById('show-notification');

    // Prüfen, ob die Anwendung als PWA läuft
    var isPWA = window.matchMedia('(display-mode: standalone)').matches;

    // Prüfen, ob der Installationsbutton schon einmal geklickt wurde
    var installButtonClicked = localStorage.getItem('installButtonClicked') === 'true';

    // Wenn die App als PWA läuft oder der Installationsbutton schon einmal geklickt wurde, dann den "App installieren"-Button verstecken
    if (isPWA || installButtonClicked) {
      showNotificationBtn.style.display = 'none';
    } else {
      showNotificationBtn.addEventListener('click', function() {
        if (os === 'Android' || os === 'iOS') {
          // Definiert die Nachricht
          message.textContent = 'Installiere unsere Web-App auf deinem ' + os + ' Gerät, um deine Punkte immer zur Hand zu haben.';
        
          // Zeigt die Benachrichtigung an
          notification.style.display = 'block';
        }

        // Fügt einen Ereignishandler zum Installationsbutton hinzu
        installBtn.addEventListener('click', function() {
          // Speichern, dass der Installationsbutton geklickt wurde
          localStorage.setItem('installButtonClicked', 'true');

          if (os === 'Android') {
            // Zeigt die Installationsaufforderung an
            deferredPrompt.prompt();
            // Wartet auf die Antwort des Benutzers
            deferredPrompt.userChoice.then((choiceResult) => {
              if (choiceResult.outcome === 'accepted') {
                console.log('Der Benutzer hat die Installation akzeptiert');
              } else {
                console.log('Der Benutzer hat die Installation abgelehnt');
              }
              deferredPrompt = null;
            });
          } else if (os === 'iOS') {
            // Zeigt die Installationsanweisungen für iOS an
            instructions.textContent = 'Um diese App zu installieren, öffnen Sie Safari, tippen Sie auf die Schaltfläche "Teilen" und dann auf "Zum Home-Bildschirm hinzufügen".';
            instructions.style.display = 'block';
          }
        });

        // Fügt einen Ereignishandler zum Schließen-Button hinzu
        closeBtn.addEventListener('click', function() {
          // Versteckt die Benachrichtigung
          notification.style.display = 'none';
        });
      });
    }

    document.addEventListener('DOMContentLoaded', function() {
        let now = new Date();
        let day = now.getDay();
        let hour = now.getHours();
        let minute = now.getMinutes();

        let vacationStartDate = new Date(2023, 7, 9);
        let vacationEndDate = new Date(2023, 7, 16);

        let status = document.createElement('p');
        let circle = document.createElement('span');
        circle.classList.add('status-circle');

        // Aquí el código para determinar el estado y el color del círculo.

        if (now >= vacationStartDate && now <= vacationEndDate) {
            status.textContent = "Wir sind bis zum 16. August im Urlaub";
            circle.classList.add('red');
        } else {
            function isOpen(timeStart, timeEnd) {
                let [hourStart, minuteStart] = timeStart.split(':').map(Number);
                let [hourEnd, minuteEnd] = timeEnd.split(':').map(Number);
                
                let openingTime = new Date(now);
                openingTime.setHours(hourStart, minuteStart);
                
                let closingTime = new Date(now);
                closingTime.setHours(hourEnd, minuteEnd);
                
                if (now >= openingTime && now < closingTime) {
                    return true;
                }
                return false;
            }

            if (day === 0 || day === 1) {
                status.textContent = "Heute ist Ruhetag";
                circle.classList.add('red');
            } else if ((day >= 3 && day <= 5 && (isOpen('11:30', '13:30') || isOpen('18:00', '22:00'))) ||
                (day === 2 || day === 6) && isOpen('18:00', '22:00')) {

                if ((isOpen('11:30', '13:00') || isOpen('18:00', '21:30'))) {
                    status.textContent = `Schließt bald. Wir schließen um ${(isOpen('11:30', '13:00') ? "13:30 Uhr" : "22:00 Uhr")}`;
                    circle.classList.add('yellow');
                } else {
                    status.textContent = "Derzeit geöffnet";
                    circle.classList.add('green');
                }
            } else {
                if (day >= 3 && day <= 5) {
                    if (isOpen('11:00', '11:30')) {
                        status.textContent = "Öffnet um 11:30 Uhr";
                        circle.classList.add('yellow');
                    } else if (isOpen('17:30', '18:00')) {
                        status.textContent = "Öffnet um 18:00 Uhr";
                        circle.classList.add('yellow');
                    } else {
                        status.textContent = `Geschlossen. Wir öffnen um ${(hour >= 13 && hour < 18) ? "18:00 Uhr" : "11:30 Uhr"}`;
                        circle.classList.add('red');
                    }
                } else if (day === 2 || day === 6) {
                    if (isOpen('17:30', '18:00')) {
                        status.textContent = "Öffnet um 18:00 Uhr";
                        circle.classList.add('yellow');
                    } else {
                        status.textContent = "Geschlossen. Wir öffnen um 18:00 Uhr";
                        circle.classList.add('red');
                    }
                }
            }
        }

        let statusContainer = document.createElement('div');
        statusContainer.classList.add('status-container');

        let title = document.createElement('h4');
        title.textContent = "Aktueller Status";
        statusContainer.appendChild(title);

        status.prepend(circle);
        statusContainer.appendChild(status);

        let bloque = document.querySelector('.bloque');
        bloque.appendChild(statusContainer);
    });
