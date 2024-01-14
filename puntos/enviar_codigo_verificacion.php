<?php
// Recibir el correo electrónico del formulario
$email = $_POST['email'];

// Generar un código de verificación aleatorio de 4 dígitos
$codigo_verificacion = str_pad(mt_rand(1000, 9999), 4, '0', STR_PAD_LEFT);

// Guardar el código de verificación en la sesión (opcionalmente, puedes usar una base de datos)
session_start();
$_SESSION['codigo_verificacion'] = $codigo_verificacion;

// Dirección de correo para enviar el código de verificación
$to = $email;

// Asunto del correo
$subject = 'Bestätigungscode für Cantina Tex Mex';

// Contenido del correo
$message = "<p>Dein Bestätigungscode für Cantina Tex Mex lautet: $codigo_verificacion</p>";
$message .= "<p>Dieser Code ist erforderlich, um deine E-Mail-Adresse zu verifizieren.<br>";
$message .= "Bitte gib diesen Code auf der Verifizierungsseite ein, um den Vorgang abzuschließen. Zeigen Sie den Nachweis zusammen mit dem QR-Code vor, um Ihren Rabatt zu erhalten</p>";
$message .= "<p>Vielen Dank,<br>";
$message .= "<strong>Das Team von Cantina Tex Mex</strong></p>";
$message .= "<img src='https://app.hundezonen.ch/docs/cantina%20copia.png' alt='Logo'><br>"; // Añade el logo al final
$message .= "<p><strong>Cantina Tex-mex</strong><br>";
$message .= "Adresse: Bahnhofstrasse 46, 9475 Sevelen<br>";
$message .= "Telefon: 0817501911<br>";
$message .= "<a href='http://cantinatexmex.ch'>cantinatexmex.ch</a></p>"; // Añade la URL clickeable

// Cabeceras del correo
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= 'From: EMAIL' . "\r\n" .
           'Reply-To: EMAIL' . "\r\n" .
           'X-Mailer: PHP/' . phpversion();

// Enviar el correo de verificación
$mailSent = mail($to, $subject, $message, $headers);

// Verificar si el correo se envió correctamente
if ($mailSent) {
  echo "Der Bestätigungscode wurde erfolgreich an Ihre E-Mail-Adresse gesendet.";
} else {
  echo "Der Bestätigungscode konnte nicht per E-Mail gesendet werden.";
}
?>
