<?php

$conn = mysqli_connect("localhost", "oliviagi_hatfactory", "%XX-(y7;e1!(", "oliviagi_myshoutbox");

if (!$conn) {
echo "Error: Unable to connect to database. ";
echo "Debugging errno: " . mysqli_connect_errno();
echo " Debugging error: " . mysqli_connect_error();
exit;
}

?>
