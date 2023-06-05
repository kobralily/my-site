<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name=viewport content="width=device-width, initial-scale=1">
	<title> My Shoutbox Project </title>
	<link rel="stylesheet" href="css/main.css">
</head>
<body>
    <div id="container">

      <header>
          <h1>My Shoutbox</h1>
      </header>
      <div id="shouts">
          <ul>
              <li>foobar</li>
          </ul>
      </div>
      <footer>
          <form id="shoutForm">
              <label for="name">Name </label>
              <input type="text" id="name" name="name" maxlength="20" required>
              <label for="shout">Shout Text </label>
              <input type="text" id="shout" name="shout" maxlength="140" required>
              <input type="submit" id="submit" value="SHOUT!">
          </form>
      </footer>


    </div> <!-- close container -->

<script src="js/shoutbox.js"></script>

</body>
</html>
