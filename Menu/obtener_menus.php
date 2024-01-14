<?php
    $servername = " ";
    $username = " ";
    $password = " ";
    $dbname = " ";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM Semanas WHERE id = 5";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $menus = $result->fetch_assoc();
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($menus, JSON_UNESCAPED_UNICODE);
} else {
    echo "No menus found";
}

$conn->close();
?>