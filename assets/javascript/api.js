

var foodsArr = ["pizza", "cheeseburger", "spaghetti", "buffalo wings"];


function displayGif() {
  $("#gif-view").empty();

  var food = $(this).attr("data-name");
  apiKey = "JxgQChtKt7o28Ndn94wSb0QhXj2uRJBH"
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&limit=10&q=" + food;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var results = response.data;

   
    console.log(response);
    for (var i = 0; i < results.length; i++) {
     
      var stillGif = results[i].images.fixed_height_still.url;
      var animatedGif = results[i].images.fixed_height.url;


      var gifDiv = $("<div>");
      var gifImg = $("<img>")
      gifImg
        .attr({"data-still": stillGif, "data-animate": animatedGif, "data-state": "still", "src": stillGif})
        .addClass("gif");
       
      var ratingDiv = $("<h5>");
      ratingDiv.text("Rating: " + results[i].rating);

      gifDiv
        .addClass("gifDiv")
        .append(ratingDiv, gifImg)
        .prependTo($("#gif-view"));
    };
  });
};

function renderButtons() {
  $("#buttons-view").empty();

  for (var i = 0; i < foodsArr.length; i++) {
    var btnCreate = $("<button>")

    btnCreate
      .addClass("food-btn btn btn-info")
      .attr("data-name", foodsArr[i])
      .text(foodsArr[i])
      .appendTo($("#buttons-view"))


  };
};


$("#add-gif").on("click", function(event) {
  event.preventDefault();

  var food = $("#giphy-input").val().trim();

  if (food == "") {
    alert("Enter a type of food first!")
    return false
  }

  foodsArr.push(food);
  console.log(food);

  renderButtons();

});

function playPauseGif() {
  var state = $(this).attr("data-state");

  if (state === "still") {
    var animatedImg = $(this).attr("data-animate");
    $(this).attr({"src": animatedImg, "data-state": "animate"});

  } else if (state === "animate") {
    var stillImg = $(this).attr("data-still")
    $(this).attr({"src": stillImg, "data-state": "still"});

  }
}

$(document).on("click", ".food-btn", displayGif);
$(document).on("click", ".gif", playPauseGif)


renderButtons();

