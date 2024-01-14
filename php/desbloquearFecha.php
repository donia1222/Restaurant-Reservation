<?php
include 'config.php';

// Crea la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica la conexión
if ($conn->connect_error) {
  die("Conexión fallida: " . $conn->connect_error);
}

// Obtén la fecha a desbloquear desde el cuerpo de la solicitud
$fecha = $_POST['fecha'];

// Preparar la consulta para desbloquear la fecha
$stmt = $conn->prepare("DELETE FROM FechasBloqueadas WHERE fecha = ?");

// Enlazar los parámetros
$stmt->bind_param("s", $fecha);

// Ejecutar la consulta
if ($stmt->execute()) {
    echo "Fecha desbloqueada exitosamente.";
} else {
    echo "Error desbloqueando fecha: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
