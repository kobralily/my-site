const shoutForm = document.querySelector('#shoutForm');


shoutForm.onsubmit = (e) => {

    const formData = new FormData(shoutForm); //take data that was sumbitted and put it into the "array" form data

    fetch('shoutbox.php', {
       method: "POST",
       body: formData, //can be any name bc this is a variable
       credentials: "same-origin"
   })

   .then( (response) => { //response is an object sent from the server
        if (!response.ok) { //ok is inside
            throw new Error("Network response was not ok");
        }
        return response.text();
    })

    .then( (data) => { //refers to the response in line 18, could be a different name, this is generioc
        document.querySelector('ul').innerHTML = data; //replaces the words inside the ul text with the data that was received from the server
        document.querySelector('#shout').value = ''; //make the value of the button empty so it keeps your name in the box but clears your text field
    })

    .catch( (error) => {
        console.error('Error in fetch: ', error);
    }); // end of fetch

  return false;

}

function refresh_shoutbox() {
    // a different fetch function, same URL
    fetch('shoutbox.php', {
      method: "POST",
      headers: { //needed to make it work
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
        // send one name-value pair not from a form
        body: 'refresher=1',
        credentials: "same-origin"
    })
    .then( (response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.text(); //might be response.json depend on format
    })
    .then( (data) => {
        document.querySelector('ul').innerHTML = data;
    })
    .catch( (error) => {
        console.error('Error in fetch: ', error);
    }); // end fetch
} // end refresh function


refresh_shoutbox(); //calls function as soon as js file runs
setInterval(refresh_shoutbox, 15000); //creates a timer that calls your new function every 15 seconds (that is, every 15000 milliseconds).
