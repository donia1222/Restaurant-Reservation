<?php
// Recibir los datos del formulario
$nombre = $_POST['Nombre'];
$email = $_POST['Email'];
$telefono = $_POST['Teléfono'];
$fecha = $_POST['fecha-seleccionada'];
$hora = $_POST['hora-seleccionada'];
$personas = $_POST['personas-seleccionadas'];

// Obtén la cantidad de puntos y agrega 10 puntos adicionales
$puntos = obtenerPuntos($email) + 10;

// Dirección de correo para enviar el correo de confirmación
$to = $email . ', your-email';

// Asunto del correo
$subject = 'Reservierungsbestätigung für Cantina Tex Mex';

// Enlace para editar la reserva
$enlaceEditar = "php/editar_reserva.php?email=" . urlencode($email);
// Enlace para eliminar la reserva
$enlaceEliminar = "php/eliminar_reserva.php?email=" . urlencode($email);

// Contenido del correo
$message = "<html><head>";
$message .= "<style>
    @import url('https://fonts.googleapis.com/css2?family=Alata&display=swap');
    body {
        font-family: 'Alata', sans-serif;
    }
</style>";
$message .= "</head><body>";
$message .= "<p>Sehr geehrte/r Frau/Herr $nombre,</p>";
$message .= "<p>Ihre Reservierung in der Cantina Tex Mex wurde bestätigt. Hier sind die Details Ihrer Reservierung:</p>";
$message .= "<p>Datum: $fecha<br>";
$message .= "Uhrzeit: $hora Uhr<br>";
$message .= "Anzahl der Personen: $personas</p>";
$message .= "<p>Punkte: $puntos</p>"; // Añade los puntos al mensaje
$message .= "<p>Vielen Dank, dass Sie sich für die Cantina Tex Mex entschieden haben. Wir freuen uns, Sie bald zu sehen!</p>";
$message .= "<p>Mit freundlichen Grüßen,<br>";
$message .= "Das Team der Cantina Tex Mex</p>";
$message .= "<img src='https://app.hundezonen.ch/docs/cantina%20copia.png' alt='Logo'><br>"; // Añade el logo al final
$message .= "<p><strong>Cantina Tex-Mex</strong><br>"; // Texto en negrita
$message .= "<strong>Adresse:</strong> Bahnhofstrasse 46, 9475 Sevelen<br>"; // Texto en negrita
$message .= "<strong>Telefon:</strong> 0817501911<br>"; // Texto en negrita
$message .= "<a href='http://cantinatexmex.ch'>cantinatexmex.ch</a></p>"; // Añade la URL clickeable

// Agregar los enlaces de edición y eliminación al mensaje
$message .= "<p>Um Ihre Reservierung zu bearbeiten, klicken Sie auf diesen Link: <a href='$enlaceEditar'>Reservierung bearbeiten</a></p>";
$message .= "<p>Wenn Sie Ihre Reservierung stornieren möchten, klicken Sie hier: <a href='$enlaceEliminar'>Reservierung stornieren</a></p>";

$message .= "</body></html>";

// Cabeceras del correo
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= 'From: reservierung@cantinatexmex.ch' . "\r\n" .
           'Reply-To: info@lweb.ch' . "\r\n" .
           'X-Mailer: PHP/' . phpversion();

// Enviar el correo
$mailSent = mail($to, $subject, $message, $headers);

// Verificar si el correo se envió correctamente
if ($mailSent) {
  echo "Bestätigungs-E-Mail erfolgreich gesendet.";
} else {
  echo "Fehler beim Senden der Bestätigungs-E-Mail.";
}

// Función para obtener los puntos de un usuario
function obtenerPuntos($email) {
  include 'config.php';
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT puntos FROM emails_puntos WHERE email = '$email'";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
      $row = $result->fetch_assoc();
      return $row['puntos'];
    } else {
      return 0;
    }

    $conn->close();
}
?>