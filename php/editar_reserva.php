<!DOCTYPE html>
<html>
<head>
<title>Reservierung bearbeiten</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
<link href="https://fonts.googleapis.com/css2?family=Acme&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Acme&family=Alata&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Hoefler+Text&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Merienda:wght@400;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1/i18n/jquery.ui.datepicker-de.min.js"></script>
    <script>
    $(document).ready(function() {
        $.ajax({
            url: 'obtenerFechasBloqueadas.php',
            type: 'GET',
            dataType: 'json',
            success: function(fechasBloqueadas) {
                $("#datepicker").datepicker({
                    minDate: 0,
                    beforeShowDay: function(date) {
                        var currentDate = new Date();
                        currentDate.setHours(0, 0, 0, 0); // Setear la hora a 00:00:00

                        if (date < currentDate) {
                            // Bloquear los días anteriores a hoy
                            return [false, ''];
                        }

                        var day = date.getDay();
                        var string = jQuery.datepicker.formatDate('yy-mm-dd', date);

                        // Bloquear todos los días de domingo (0) y lunes (1)
                        if (day === 0 || day === 1) {
                            return [false, ''];
                        }

                        return [fechasBloqueadas.indexOf(string) == -1];
                    },
                    dateFormat: 'yy-mm-dd',
                    onSelect: function(dateText) {
                        var selectedDate = $(this).datepicker('getDate');
                        var day = selectedDate.getDay();

                        var timePicker = $('#timepicker');
                        timePicker.empty();

                        if (day == 2 || day == 6) {
                            // Tuesday or Saturday
                            var times = ['18:00', '18:30', '19:00', '19:30', '20:00'];
                        } else {
                            var times = [
                                '11:30', '12:00', '12:30', '13:00',
                                '18:00', '18:30', '19:00', '19:30', '20:00'
                            ];
                        }

                        for (var i = 0; i < times.length; i++) {
                            timePicker.append(new Option(times[i], times[i]));
                        }
                    }
                });

                $("#datepicker").datepicker($.datepicker.regional["de"]);
            },
            error: function(error) {
                console.error("Error al obtener las fechas bloqueadas: ", error);
            }
        });
    });
    </script>


<style>
       body {
            font-family: Arial, sans-serif;
            background-color: #f7f7f7;
            margin: 0;
            padding: 20px;
        }

h2 {
    color: #0e7269;
    text-align: center;
    font-family: merienda;
    padding-bottom: 10px;
}
        form {
            max-width: 700px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        label {
            display: block;
            margin-bottom: 5px;
            color: #555;
        }

        input[type="date"],
        input[type="time"],
        input[type="number"],
        input[type="text"],
        input[type="tel"],
        input[type="submit"] {
            width: 100%;
            padding: 10px;
            margin-bottom: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
        }

        input[type="submit"] {
            background-color: #009688;
            color: #fff;
            border: none;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        input[type="submit"]:hover {
            background-color: #45a049;
        }
p {
    color: #ffffff;
    font-size: 18px;
    background-color: #009688;
    width: 60%;
    text-align: center;
    display: block;
    margin: auto;
    margin-top: 30px;
    border-radius: 10px;
    padding: 10px;
    font-family: merienda;
}

 .datepicker {
    background-color: #f8f9fa;
    color: #495057;
}

.datepicker td, .datepicker th {
    width: 2.5em;
    height: 2.5em;
}
select {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
}
.datepicker table tr td.disabled, .datepicker table tr td.disabled {
    background: 0 0;
    color: #78787854;
    cursor: default;
}
.datepicker td, .datepicker th {
    text-align: center;
    width: 40px;
    height: 30px;
    -moz-border-radius: 4px;
    border: none;
    border-radius: 10px;
 }
h5#reservierungModalLabel {
    text-align: center;
    display: block;
    margin: auto;
    font-family: alata;
    margin-bottom: 20px;
    color: #E91E63;
}

.modal-body {
    display: block;
    margin: auto;
    text-align: center;
    background-color: #dddddd;
    width: 80%;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 20px;
    font-family: alata;
}
#datepicker {
        font-family: Arial, sans-serif;
        font-size: 16px;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #cccccc;
        width: 200px;
    }

    /* Estilo para el select de la hora */
    #timepicker {
        font-family: Arial, sans-serif;
        font-size: 16px;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #cccccc;
        width: 200px;
        margin-top: 10px;
    }
  .ui-datepicker .ui-datepicker-title {
    width: 60%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
}  
.ui-state-default, .ui-widget-content .ui-state-default, .ui-widget-header .ui-state-default, .ui-button, html .ui-button.ui-state-disabled:hover, html .ui-button.ui-state-disabled:active {
    border: 2px solid #c5c5c500;
    background: #f6f6f6;
    font-weight: normal;
    color: #454545;
    border-radius: 10px;
    text-align: center;
    font-family: 'Alata';
}
img {
    display: block;
    margin: auto;
    margin-top: -10px;
    background-color: #ffffff00;
    padding: 5px;
    border-radius: 20px;
}
  }
        
    </style>
</head>
<body>

    <?php
    // Recuperar el correo electrónico del usuario desde la URL
    $email = $_GET['email'];

    // Conectar a la base de datos
    $servername = " ";
    $username = " ";
    $password = " ";
    $dbname = " ";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }

    // Consulta SQL para obtener los datos de la reserva actual
    $sql = "SELECT * FROM Reservas WHERE email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $fecha = $row['fecha'];
        $hora = $row['hora'];
        $personas = $row['personas'];
        $nombre = $row['nombre'];
        $telefono = $row['telefono'];
    } else {
        // Si no se encontró la reserva, puedes mostrar un mensaje de error o redireccionar a otra página.
        echo "Reserva no encontrada.";
        exit;
    }

    $conn->close();
    ?>
    
<img src="https://app.hundezonen.ch/docs/cantina.png" alt="Description of the image">
<h2>Reservierung bearbeiten</h2>
<form action="actualizar_reserva.php" method="post">
<input type="hidden" name="email" value="<?php echo $email; ?>">
<label for="fecha">Bitte wählen Sie das Datum und die Uhrzeit erneut aus:</label>
<input type="text" id="datepicker" name="fecha" placeholder="Wählen Sie ein Datum" required><br>
    <label for="hora">Uhrzeit:</label>
   <select id="timepicker" name="hora" required>
    </select>
    <label for="personas">Anzahl der Personen:</label>
    <input type="number" name="personas" value="<?php echo $personas; ?>" required><br>
    <label for="nombre">Name:</label>
    <input type="text" name="nombre" value="<?php echo $nombre; ?>" required><br>
    <label for="telefono">Telefon:</label>
    <input type="tel" name="telefono" value="<?php echo $telefono; ?>" required><br>
    <input type="submit" value="Reservierung aktualisieren">
</form>

<?php
if (isset($_GET['edicionExitosa']) && $_GET['edicionExitosa'] == "true") {
    // Set the locale to German
    setlocale(LC_TIME, 'de_DE');

    // Format the date and time
    $fechaFormatted = strftime('%d. %B', strtotime($fecha));
    $horaFormatted = substr($hora, 0, 5);

    // Send updated email to user
    $toUsuario = $email; // User's email
    $subjectUsuario = 'Aktualisierung Ihrer Reservierung bei Cantina Tex Mex';
    $messageUsuario = "Sehr geehrte/r $nombre,\n\nIhre Reservierung bei Cantina Tex Mex wurde erfolgreich aktualisiert. Hier sind die neuen Details Ihrer Reservierung:\n\nDatum: $fechaFormatted\nUhrzeit: $horaFormatted\nAnzahl der Personen: $personas\n\nVielen Dank, dass Sie sich für Cantina Tex Mex entschieden haben.\n\nMit freundlichen Grüßen,\nDas Team von Cantina Tex Mex";
    $headersUsuario = "From: info@cantinatexmex.ch";

    mail($toUsuario, $subjectUsuario, $messageUsuario, $headersUsuario);

    // Send updated email to admin (replace 'info@cantinatexmex.ch' with admin's email)
    $toAdmin = 'info@lweb.ch'; // Admin's email
    $subjectAdmin = 'Reservierung aktualisiert bei Cantina Tex Mex';
    $messageAdmin = "Eine Reservierung bei Cantina Tex Mex wurde aktualisiert. Hier sind die neuen Details der Reservierung:\n\nName: $nombre\nE-Mail: $email\nTelefon: $telefono\nDatum: $fechaFormatted\nUhrzeit: $horaFormatted\nAnzahl der Personen: $personas";
    $headersAdmin = "From: info@cantinatexmex.ch";

    mail($toAdmin, $subjectAdmin, $messageAdmin, $headersAdmin);

    echo '<div id="scrollTo"><p>Reservierung erfolgreich aktualisiert!</p></div>';
}
?>




<script>
    window.onload = function() {
        let scrollToDiv = document.getElementById("scrollTo");
        if (scrollToDiv) {
            scrollToDiv.scrollIntoView({behavior: "smooth"});
        }
    };
</script>

</body>

</html>