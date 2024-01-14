<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibir los datos del formulario
    $email = $_POST['email'];
    $fecha = $_POST['fecha'];
    $hora = $_POST['hora'];
    $personas = $_POST['personas'];
    $nombre = $_POST['nombre'];
    $telefono = $_POST['telefono'];

    // Conexión a la base de datos
    include 'config.php';

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Consulta SQL para actualizar la reserva con la nueva información
    $sql = "UPDATE Reservas SET fecha = '$fecha', hora = '$hora', personas = '$personas', nombre = '$nombre', telefono = '$telefono', fecha_edicion = NOW() WHERE email = '$email'";

    if ($conn->query($sql) === TRUE) {
        // Redirigir al usuario a la página de edición exitosa
        header("Location: editar_reserva.php?email=" . urlencode($email) . "&edicionExitosa=true");
        exit;
    } else {
        echo "Fehler beim Aktualisieren der Reservierung: " . $conn->error;
    }

    $conn->close();
} else {
    echo "Ungültiger Zugriff.";
}
?>
