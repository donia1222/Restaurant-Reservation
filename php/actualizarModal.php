<?php
include 'config.php';
// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Obten los valores de POST
$mensaje = $_POST['mensaje'];
$estado = $_POST['estado'];

// Actualiza el estado y/o mensaje en la base de datos
if ($mensaje) {
    $stmt = $conn->prepare("UPDATE ConfiguracionModal SET mensaje_modal = ? WHERE id = 1");
    $stmt->bind_param("s", $mensaje);
    $stmt->execute();
}

if ($estado) {
    $estadoBool = $estado == 'true' ? 1 : 0;
    $stmt = $conn->prepare("UPDATE ConfiguracionModal SET estado_modal = ? WHERE id = 1");
    $stmt->bind_param("i", $estadoBool);
    $stmt->execute();
}

$conn->close();
?>
