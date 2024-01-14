<?php
// Al inicio del script
setlocale(LC_TIME, "de_DE.UTF-8");

// Recibir el parámetro 'email' de la reserva a eliminar
if (isset($_POST['email'])) {
    $email = $_POST['email'];

    include 'config.php';

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Consulta SQL para obtener los datos de la reserva antes de eliminarla
    $sql = "SELECT nombre, fecha, hora, personas FROM Reservas WHERE email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $nombre = $row['nombre'];
        $fecha = strftime("%d. %B", strtotime($row['fecha'])); // Modificación aquí
        $hora = date("H:i", strtotime($row['hora'])); // Formatear la hora sin ceros adicionales
        $personas = $row['personas'];

        // Envío del correo electrónico al usuario
        $toUsuario = $email; // Correo electrónico del usuario
        $subjectUsuario = 'Bestätigung der Stornierung Ihrer Reservierung in der Cantina Tex Mex';
        $messageUsuario = "Sehr geehrte/r $nombre,\n\nIhre Reservierung in der Cantina Tex Mex für das Datum $fecha und die Uhrzeit $hora für $personas Personen wurde erfolgreich storniert.\n\nVielen Dank, dass Sie die Cantina Tex Mex für Ihre Reservierung in Betracht gezogen haben.\n\nMit freundlichen Grüßen,\nDas Team der Cantina Tex Mex";
        $headersUsuario = "From: info@cantinatexmex.ch";

        mail($toUsuario, $subjectUsuario, $messageUsuario, $headersUsuario);

        // Envío del correo electrónico al administrador
        $toAdmin = 'info@cantinatexmex.ch'; // Correo electrónico del administrador
        $subjectAdmin = 'Stornierung der Reservierung in der Cantina Tex Mex';
        $messageAdmin = "Eine Reservierung in der Cantina Tex Mex wurde storniert. Hier sind die Details der stornierten Reservierung:\n\nName: $nombre\nE-Mail: $email\nTelefon: $telefono\nDatum: $fecha\nUhrzeit: $hora\nAnzahl der Personen: $personas";
        $headersAdmin = "From: info@cantinatexmex.ch";

        mail($toAdmin, $subjectAdmin, $messageAdmin, $headersAdmin);

        // Consulta SQL para eliminar la reserva
        $sqlEliminar = "DELETE FROM Reservas WHERE email = '$email'";

        if ($conn->query($sqlEliminar) === TRUE) {
            // Mostrar el mensaje de reserva cancelada
            echo "Reservierung erfolgreich storniert.";

            // Redirigir al usuario a la página de confirmación de eliminación después de unos segundos
            header("Refresh: 0; URL=confirmacion_eliminacion.php");
            exit;
        } else {
            echo "Fehler beim Löschen der Reservierung: " . $conn->error;
        }
    } else {
        echo "Die E-Mail-Adresse für die zu stornierende Reservierung wurde nicht angegeben.";
    }

    $conn->close();
} else {
    echo "Die E-Mail-Adresse für die zu stornierende Reservierung wurde nicht angegeben.";
}
?>
