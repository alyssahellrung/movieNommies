// Array of nominated movies (starts empty)
var nominees = [];

// Function to get the results of user's search
function searchMovies(movie) {

  // Empties the results div of previous search result
  $("#results-div").empty();
  $("#nominee-alert").empty();

  // Sets up query information
  var queryURL = "https://www.omdbapi.com/?i=tt3896198&apikey=ef79f707&t=" + movie;

  // AJAX call for the movie being searched
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    // Creating a div to hold the movie
    var movieDiv = $("<div class='movie'>");

    // Creating an <h3> for movie title
    var movieTitle = $("<h2>").text(movie)
    movieTitle.addClass("movie-title");

    // Displaying the title
    movieDiv.append(movieTitle);

    // Storing the release year
    var released = response.Released;

    // Creating an element to hold the release year
    var movieReleaseP = $("<p>").text("Released: " + released);

    // Displaying the release year
    movieDiv.append(movieReleaseP);

    // Storing the plot
    var plot = response.Plot;

    // Creating an element to hold the plot
    var plotP = $("<p>").text("Plot: " + plot);

    // Appending the plot
    movieDiv.append(plotP);

    // Retrieving the URL for the image
    var imgURL = response.Poster;

    // Creating an element to hold the image
    var image = $("<img>").attr("src", imgURL);

    // Appending the image
    movieDiv.append(image);

    // Creating a button element
    var nominateButton = $("<input type='button' name='nominate' value='Nominate' id='nominate-btn'>");
    nominateButton.addClass("btn btn-warning float:center");
    nominateButton.css("float", "center");
    // Appending button to movieDiv if movie is not already in the array
    var nomCondition = nominees.indexOf(movie);
      if (nomCondition == -1) {
      movieDiv.append(nominateButton);
      }  
    // Putting the results in the results div
    $("#results-div").append(movieDiv);
  });
}

// Function that triggers nominations limit alert
function maximumAlert() {
  var movieAlert = $("<div class='alert alert-primary'>").html("<p>You have reached your limit of five nominations.</p>");
  $("#nominee-alert").append(movieAlert);
} 

// Function that renders the list of nominees on the right side of the screen
function renderNominees() {
    // Only allows users to nominate up to five movies
    if (nominees.length <= 5) {
      $("ul").empty();
      for (var i = 0; i < nominees.length; i++) {
      var item = $("<li>");
      item.addClass("list-group-item");
      item.text(nominees[i]);

      // Creates the delete button
      var deleteBtn =  $("<input type='button' name='delete' value='x' id='delete'>");
      deleteBtn.addClass("btn btn-xs btn-danger");
      deleteBtn.css("float", "right");

      // Appends delete button to list item
      item.append(deleteBtn);

      // Appends entire list item to ul
      $("ul").append(item);
      }
    } 
}

// Event handler for user clicking the submit button
$("#search-movie-btn").on("click", function(event) {
  // Preventing the button from trying to submit the form
  event.preventDefault();
  // Storing the movie name
  var movie = $("#movie-input").val().trim();
  // Running the searchMovies function
  searchMovies(movie);
  $("#movie-input").val("");
});

// Event handler for user clicking the nominate button
$("#results-div").on("click", "#nominate-btn", function(event) {
  event.preventDefault();
  var nominatedName = $(".movie-title").text();
  var nomCondition = nominees.indexOf(nominatedName);
      if (nominees.length <5 && nomCondition == -1) { 
        nominees.push(nominatedName);
      }
      else {
        maximumAlert();
      }
  renderNominees();
  $("#results-div").empty(); 
});

// Event handler for user clicking the delete button
$("ul").on("click", ".btn-danger", function() {
  // Grabs the name of the movie and deletes it from the array
  var index = nominees.indexOf($(this).parent(".list-group-item").text());
  if (index > -1) {
    nominees.splice(index, 1);
  }
  // Removes the list item from the page
  $(this).parent(".list-group-item").remove();
});

