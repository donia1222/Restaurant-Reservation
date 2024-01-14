<?php
include 'config.php';

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Consulta SQL para obtener las reservas ordenadas por fecha
$sql = "SELECT fecha, hora, personas, nombre, email FROM Reservas ORDER BY fecha ASC";

$result = $conn->query($sql);

$reservas = array();

if ($result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $reservas[] = $row;
  }
}

$conn->close();

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
echo json_encode($reservas);
?>
