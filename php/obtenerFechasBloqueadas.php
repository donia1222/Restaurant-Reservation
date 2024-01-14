<?php
include 'config.php';
// Crea una conexión a la base de datos
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica la conexión
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT fecha FROM FechasBloqueadas";
$result = $conn->query($sql);

$fechasBloqueadas = [];
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        $fechasBloqueadas[] = $row["fecha"];
    }
} 

echo json_encode($fechasBloqueadas);

$conn->close();
?>
