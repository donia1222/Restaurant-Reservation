<?php
    $servername = " ";
    $username = " ";
    $password = " ";
    $dbname = " ";
// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Recoger los datos del formulario
$fecha = date("Y-m-d", strtotime($_POST['fecha-seleccionada'])); // Convertir la fecha al formato adecuado (YYYY-MM-DD)
$hora = $_POST['hora-seleccionada'];
$personas = $_POST['personas-seleccionadas'];
$nombre = $_POST['Nombre'];
$email = $_POST['Email'];
$telefono = $_POST['Teléfono'];

// Consulta SQL para insertar los datos en la base de datos
$sql = "INSERT INTO Reservas (fecha, hora, personas, nombre, email, telefono)
VALUES ('$fecha', '$hora', '$personas', '$nombre', '$email', '$telefono')";

if ($conn->query($sql) === TRUE) {
  echo "Reserva añadida con éxito";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

// Consultar si el correo electrónico ya existe en la tabla de puntos
$sql = "SELECT puntos FROM emails_puntos WHERE email = '$email'";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
  // Si el correo electrónico existe, obtener el total de puntos actual y sumar 10 puntos
  $row = mysqli_fetch_assoc($result);
  $puntosActuales = $row['puntos'];
  $nuevosPuntos = $puntosActuales + 10;
  $sql = "UPDATE emails_puntos SET puntos = $nuevosPuntos WHERE email = '$email'";
} else {
  // Si el correo electrónico no existe, crear una nueva entrada con 10 puntos
  $sql = "INSERT INTO emails_puntos (email, puntos) VALUES ('$email', 10)";
}

// Ejecutar la consulta para actualizar o insertar los puntos
if (!mysqli_query($conn, $sql)) {
  echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

$conn->close();
?>