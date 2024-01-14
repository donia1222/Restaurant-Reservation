<?php
    $servername = " ";
    $username = " ";
    $password = " ";
    $dbname = " ";

// Obtener los datos enviados por la solicitud POST
$email = $_POST['email'];
$nuevosPuntos = $_POST['puntos'];

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Actualizar los puntos para el email en la base de datos
$sql = "UPDATE emails_puntos SET puntos = $nuevosPuntos WHERE email = '$email'";

if ($conn->query($sql) === TRUE) {
  echo "Puntos actualizados correctamente.";
} else {
  echo "Error al actualizar los puntos: " . $conn->error;
}

$conn->close();
?>
