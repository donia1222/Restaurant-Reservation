<?php
    $servername = " ";
    $username = " ";
    $password = " ";
    $dbname = " ";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$email = $_POST['email'];

$sql = "SELECT puntos FROM emails_puntos WHERE email = '$email'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
  $row = $result->fetch_assoc();
  $puntos = $row['puntos'];
  echo json_encode(array('puntos' => $puntos));
} else {
  echo json_encode(array('puntos' => 0));
}

$conn->close();
?>
