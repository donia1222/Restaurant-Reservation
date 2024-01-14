
// Modificamos la función para ajustar la fecha
function obtenerReservas(filterFunction) {
  fetch('php/obtener_reservas.php')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.querySelector('table tbody');
      tableBody.innerHTML = ''; 

      data.forEach(reserva => {
        const row = document.createElement('tr');

        // Convertimos la fecha en formato dia/mes/año
        const fechaFormateada = formatoFechaParaMostrar(reserva.fecha);

        // Formateamos la hora para eliminar ceros de más
        const horaFormateada = reserva.hora.replace(/:00$/, '');

        row.innerHTML = `
          <td>${fechaFormateada}</td>
          <td>${horaFormateada}</td>
          <td>${reserva.personas}</td>
          <td>${reserva.nombre}</td>
        `;
        tableBody.appendChild(row);
      });

      // Ocultar la tabla si no hay reservas
      if (data.length === 0) {
        tableBody.style.display = 'none';
      } else {
        tableBody.style.display = 'table-row-group';
      }

      if (filterFunction) {
        filterFunction();
      }
    })
    .catch(error => console.error(error));
}

// Creamos una función que formatee la fecha como día/mes/año
function formatoFechaParaMostrar(fechaString) {
  const [year, month, day] = fechaString.split("-");

  // Usamos slice(-2) para obtener los últimos 2 dígitos del año
  return `${day}/${month}/${year.slice(-2)}`;
}

// Modificamos la función formatoFecha para manejar el nuevo formato de fecha
function formatoFecha(fechaString) {
  const [day, month, year] = fechaString.split("/");

  // Asegúrate de que el año tenga 4 dígitos
  const yearFull = parseInt(year) > 50 ? `19${year}` : `20${year}`;
  
  return new Date(yearFull, month - 1, day);
}

  function mostrarEmail(email) {
    const emailModal = document.getElementById('emailModal');
    const emailText = document.getElementById('emailText');

    emailText.textContent = email;
    emailModal.style.display = 'block';

    // Después de 3 segundos, oculta el email
    setTimeout(function() {
      emailModal.style.display = 'none';
    }, 3000);
  }
function formatoHora(textoHora) {
    const [horas, minutos] = textoHora.split(':').map(Number);
    const fecha = new Date();
    fecha.setHours(horas, minutos);
    return fecha;
}

function filtrarReservasPorHoy() {
    const fechaHoy = new Date();
    fechaHoy.setHours(0, 0, 0, 0);
    const filas = document.querySelectorAll('table tbody tr');
    const reservasHoy = [];

    filas.forEach(fila => {
        const fechaReserva = formatoFecha(fila.querySelector('td:first-child').innerText);
        if (
            fechaReserva.getFullYear() === fechaHoy.getFullYear() &&
            fechaReserva.getMonth() === fechaHoy.getMonth() &&
            fechaReserva.getDate() === fechaHoy.getDate()
        ) {
            reservasHoy.push(fila);
            fila.style.display = '';
        } else {
            fila.style.display = 'none';
        }
    });

    reservasHoy.sort((a, b) => {
        const horaA = formatoHora(a.querySelector('td:nth-child(2)').innerText);
        const horaB = formatoHora(b.querySelector('td:nth-child(2)').innerText);
        return horaA - horaB;
    });

    const tbody = document.querySelector('table tbody');
    reservasHoy.forEach(fila => {
        tbody.appendChild(fila);
    });
}

function filtrarReservasPorSemana() {
  const fechaHoy = new Date();
  fechaHoy.setHours(0, 0, 0, 0);
  const fechaSemana = new Date(fechaHoy.getTime());
  fechaSemana.setDate(fechaHoy.getDate() + 7);
  const filas = Array.from(document.querySelectorAll('table tbody tr'));

  const reservasSemana = filas.filter(fila => {
    const fechaReserva = formatoFecha(fila.querySelector('td:first-child').innerText);
    return fechaReserva >= fechaHoy && fechaReserva < fechaSemana;
  });

  reservasSemana.sort((a, b) => {
    const fechaA = formatoFecha(a.querySelector('td:first-child').innerText);
    const fechaB = formatoFecha(b.querySelector('td:first-child').innerText);

    if (fechaA < fechaB) return -1;
    if (fechaA > fechaB) return 1;

    const horaA = formatoHora(a.querySelector('td:nth-child(2)').innerText);
    const horaB = formatoHora(b.querySelector('td:nth-child(2)').innerText);

    return horaA - horaB;
  });

  const tbody = document.querySelector('table tbody');
  tbody.innerHTML = ''; // Limpia el cuerpo de la tabla

  reservasSemana.forEach(fila => tbody.appendChild(fila)); // Añade las filas ordenadas a la tabla
}


  document.getElementById('btnHoy').addEventListener('click', function () {
    obtenerReservas(filtrarReservasPorHoy);
  });

  document.getElementById('btnSemana').addEventListener('click', function () {
    obtenerReservas(filtrarReservasPorSemana);
  });

  document.getElementById('btnTodas').addEventListener('click', function () {
    obtenerReservas();
  });

    // Verificar si ya hay un código guardado en el almacenamiento local (localStorage)
    const savedCode = localStorage.getItem('accessCode');

    if (savedCode) {
      // Si hay un código guardado, mostrar directamente el contenido protegido
      document.getElementById('codeInput').style.display = 'none'; // Ocultar el campo de ingreso de código
      document.getElementById('content').style.display = 'block'; // Mostrar el contenido protegido
    }

    // Función para verificar el código ingresado
    document.getElementById('btnSubmitCode').addEventListener('click', function() {
      const codeInput = document.getElementById('code');
      const codeInputLabel = document.querySelector('label[for="code"]');
      const contentDiv = document.getElementById('content');
      const enteredCode = codeInput.value;

      // Aquí se compara el código ingresado con el código requerido (060916)
      if (enteredCode === '060916') {
        // Guardar el código en el almacenamiento local
        localStorage.setItem('accessCode', enteredCode);

        // Ocultar el cuadro de diálogo y mostrar el contenido protegido
        document.getElementById('codeInput').style.display = 'none';
        contentDiv.style.display = 'block'; // Mostrar el contenido protegido
      } else {
        alert('Código incorrecto. Por favor, intenta nuevamente.');
      }
    });

  // Mostrar todas las reservas al cargar la página
  obtenerReservas();

function cambiarMensaje() {
    var nuevoMensaje = document.getElementById("nuevo-mensaje").value;

    // Crear una cadena de consulta con los parámetros mensaje y estado
    var cuerpo = 'mensaje=' + encodeURIComponent(nuevoMensaje) + '&estado=' + encodeURIComponent('true');

    fetch('php/actualizarModal.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: cuerpo
    })
    .then(response => response.text())
    .then(result => {
        // Redirige a la página principal después de actualizar el mensaje
        window.location.href = "https://reservierung.cantinatexmex.ch/index.html";
    })
    .catch(error => console.log('error', error));
}

function desactivarModal() {
  fetch('php/actualizarModal.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'estado=false'
  })
  .then(response => response.text())
  .then(result => {
      // Redirige a la página principal después de desactivar el modal
      window.location.href = "/index.html";
  })
  .catch(error => console.log('error', error));
}

function bloquearFecha() {
    var fecha = document.getElementById("fecha-bloquear").value;

    fetch('php/bloquearFecha.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'fecha=' + encodeURIComponent(fecha)
    })
    .then(response => response.text())
    .then(result => {
        alert(result);
        location.reload();  // Recarga la página aquí
    })
    .catch(error => console.log('error', error));
}


fetch('obtenerFechasBloqueadas.php')
.then(response => response.json())
.then(fechasBloqueadas => {
  let fechasBloqueadasHTML = '';
  for(let fecha of fechasBloqueadas) {
    fechasBloqueadasHTML += `<div>${fecha} <button onclick="desbloquearFecha('${fecha}')">Desbloquear</button></div>`;
  }
  document.getElementById('fechasBloqueadas').innerHTML = fechasBloqueadasHTML;
});

function desbloquearFecha(fecha) {
  fetch('php/desbloquearFecha.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'fecha=' + encodeURIComponent(fecha)
  })
  .then(response => response.text())
  .then(result => {
    // Recargar la página para mostrar la lista actualizada de fechas bloqueadas
    location.reload();
  })
  .catch(error => console.log('error', error));
}

    $(document).ready(function() {
      $(document).on('gesturestart', function(e) {
        e.preventDefault();
      });
    });

    $(document).ready(function() {
      $(document).on('gesturestart', function(e) {
        e.preventDefault();
      });
    });

function buscarReserva() {
    const input = document.getElementById('search');
    const filter = input.value.toUpperCase();
    const table = document.querySelector('table tbody');
    const tr = table.getElementsByTagName('tr');

    for (let i = 0; i < tr.length; i++) {
        const tdName = tr[i].getElementsByTagName('td')[3];
        const tdDate = tr[i].getElementsByTagName('td')[0];
        
        if (tdName || tdDate) {
            const txtValueName = tdName.textContent || tdName.innerText;
            const txtValueDate = tdDate.textContent || tdDate.innerText;
            
            if (txtValueName.toUpperCase().indexOf(filter) > -1 || txtValueDate.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }       
    }
}

document.getElementById('search-input').addEventListener('keyup', buscarReservas);



 document.addEventListener('DOMContentLoaded', function() {
  const textElements = document.querySelectorAll('.text-block p');

  textElements.forEach((element) => {
    element.addEventListener('click', function() {
      const text = this.textContent;
      const inputMensaje = document.getElementById('nuevo-mensaje');
      inputMensaje.value = text;
    });
  });
});

function scrollToReservas() {
  const reservasElement = document.getElementById('reservas');
  reservasElement.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}


    document.addEventListener("DOMContentLoaded", function() {
        // Función para cargar valores desde localStorage
        function loadValue(id) {
            if (localStorage.getItem(id)) {
                document.getElementById(id).value = localStorage.getItem(id);
            }
        }

        // Función para guardar valores en localStorage
        function saveValue(id) {
            localStorage.setItem(id, document.getElementById(id).value);
        }

        // Cargar valores en los campos cuando la página se carga
        loadValue("fecha");
        loadValue("titulo_mi");
        loadValue("descripcion_mi");
        loadValue("titulo_do");
        loadValue("descripcion_do");
        loadValue("titulo_fr");
        loadValue("descripcion_fr");
        loadValue("quesadilla_titulo");
        loadValue("quesadilla_descripcion");

        // Guardar valores en localStorage cuando el formulario se envía
        document.getElementById("semanaForm").addEventListener("submit", function() {
            saveValue("fecha");
            saveValue("titulo_mi");
            saveValue("descripcion_mi");
            saveValue("titulo_do");
            saveValue("descripcion_do");
            saveValue("titulo_fr");
            saveValue("descripcion_fr");
            saveValue("quesadilla_titulo");
            saveValue("quesadilla_descripcion");
        });
    });

