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

$code = rand(1000, 9999); // Genera un nuevo código aleatorio de 4 dígitos

// Actualiza el código en la base de datos
$stmt = $conn->prepare("UPDATE email_confirmations SET code = ? WHERE email = ? AND confirmed = 0");
$stmt->bind_param("is", $code, $email);
if ($stmt->execute()) {
  // Envía un correo electrónico con el nuevo código
  $to = $email;
  $subject = "Tu nuevo código de verificación";
  $message = "Aquí está tu nuevo código de verificación: $code";
  $headers = "From: info@cantinatexmex.ch" . "\r\n" .
             "Reply-To: info@cantinatexmex.ch" . "\r\n" .
             "X-Mailer: PHP/" . phpversion();
  if(mail($to, $subject, $message, $headers)) {
    echo json_encode(array('status' => 'success'));
  } else {
    echo json_encode(array('status' => 'error'));
  }
} else {
  echo json_encode(array('status' => 'error'));
}

$conn->close();
?>
