<?php
    $servername = " ";
    $username = " ";
    $password = " ";
    $dbname = " ";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$fecha = $_POST["fecha"];
$titulo_mi = $_POST["titulo_mi"];
$descripcion_mi = $_POST["descripcion_mi"];
$titulo_do = $_POST["titulo_do"];
$descripcion_do = $_POST["descripcion_do"];
$titulo_fr = $_POST["titulo_fr"];
$descripcion_fr = $_POST["descripcion_fr"];
$quesadilla_titulo = $_POST["quesadilla_titulo"];
$quesadilla_descripcion = $_POST["quesadilla_descripcion"];

$stmt = $conn->prepare("UPDATE Semanas SET fecha = ?, titulo_mi = ?, descripcion_mi = ?, titulo_do = ?, descripcion_do = ?, titulo_fr = ?, descripcion_fr = ?, quesadilla_titulo = ?, quesadilla_descripcion = ? WHERE id = 5");
$stmt->bind_param("sssssssss", $fecha, $titulo_mi, $descripcion_mi, $titulo_do, $descripcion_do, $titulo_fr, $descripcion_fr, $quesadilla_titulo, $quesadilla_descripcion);

if ($stmt->execute()) {
    // Redirigir a la página deseada después de actualizar el registro
    header('Location: /mittagsmenu');
    exit();
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
