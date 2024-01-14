<?php
// Iniciar la sesión para acceder al código de verificación generado previamente
session_start();

// Recibir el código ingresado por el usuario
$codigoIngresado = $_POST['codigo'];

// Obtener el código de verificación almacenado en la sesión
$codigoVerificacion = $_SESSION['codigo_verificacion'];

// Comparar el código ingresado con el código almacenado
if ($codigoIngresado === $codigoVerificacion) {
  // Si los códigos coinciden, la verificación es exitosa
  echo "Verifizierungscode korrekt.";
} else {
  // Si los códigos no coinciden, la verificación falla
  echo "Código de verificación incorrecto. Inténtalo nuevamente.";
}
?>
