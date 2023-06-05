<?php include 'database.php';

function populate_shoutbox($conn) { //this formats the rows with <li>s and stuff to send to the js to stick into the html
  $query = "SELECT * FROM shouts ORDER BY id DESC LIMIT 20";
  $shouts = mysqli_query($conn, $query); //run query
  while($row = mysqli_fetch_assoc($shouts)) { //if theres a row that exists in row x, write the name and shout w date.... then next row then next row
      echo '<li>';
      echo $row['name'] . ': '; // put a colon and a space after name text
      echo $row['shout'];
      echo ' [ ' . $row['date'] . ' ]'; // put brackets around date text
      echo '</li>';
  }//makes each row enclosed in an <li>
}


//when the js says fetch, this is what runs
if (isset($_POST['name']) && isset($_POST['shout'])) { // if X is in the form that got sent, $_POST referrs to the post method that was used in the javascript

  $name = mysqli_real_escape_string($conn, $_POST['name']); //this creates a variable $name to use below
  $shout = mysqli_real_escape_string($conn, $_POST['shout']); //mysqli_real_escape_string() is a function in PHP that escapes special characters in a string that will be used in an SQL statement

  date_default_timezone_set('America/New_York');
  $date = date('h:i:s a m-d-Y ', time());

  $query = "INSERT INTO shouts (name, shout, date) VALUES ('$name', '$shout', '$date')"; //the string is the sql statement that is being inserted as a safety measure, its stuffing your sql query into the variable $query
  $result = mysqli_query($conn, $query);

  if ($result) {
    //echo $name . $shout . $date; . is concatonating the variables to make them show up in a line
    //echo is like console.log
    populate_shoutbox($conn);
    //Instead of writing only the newest shout into the shoutbox (index.php), you call the PHP function you wrote earlier. When the JavaScript fetch() function runs, it’s now going to write all the shouts.

  }
  else {
    echo "Error: Unable to write to the database.";
  }

} // end of if

elseif (isset($_POST['refresher'])) {
    populate_shoutbox($conn);
} // end elseif

else {
  echo "Error: Unable to submit your shout.";
}


?>
