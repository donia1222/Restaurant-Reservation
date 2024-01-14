<!DOCTYPE html>
<html>
<head>
    <title>Reservierung stornieren</title>
     <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
     <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f7f7f7;
            margin: 0;
            padding: 20px;
        }

        h2 {
            color: #333;
            text-align: center;
        }

        p {
            color: #666;
            text-align: center;
        }

        form {
            text-align: center;
            margin-top: 20px;
        }

        input[type="submit"] {
            background-color: #F44336;
            color: #fff;
            border: none;
            padding: 10px 20px;
            font-size: 16px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        input[type="submit"]:hover {
            background-color: #45a049;
        }
    </style>   
</head>
<body>
    <?php
    // Recuperar el correo electrónico del usuario desde la URL
    $email = $_GET['email'];
    ?>

    <h2>Reservierung stornieren</h2>
    <p>Sind Sie sicher, dass Sie Ihre Reservierung stornieren möchten?</p>
    <form action="eliminar_reserva_db.php" method="post">
        <input type="hidden" name="email" value="<?php echo $email; ?>">
        <input type="submit" value="Reservierung stornieren">
    </form>
</body>
</html>
