

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
   
    console.log(response);
    for (var i = 0; i < response.data.length; i++) {
      var gifDiv = $("<div>");
      var gifImg = $("<img>")
      gifImg
        .attr("src", response.data[i].images.fixed_height.url)
        .addClass("food");
       
      var ratingDiv = $("<h5>");
      ratingDiv.text("Rating: " + response.data[i].rating);

      gifDiv
        .addClass("gifDiv")
        .append(ratingDiv, gifImg)
        .appendTo($("#gif-view"));
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
    alert("Type something")
    return false
  }

  foodsArr.push(food);
  console.log(food);

  renderButtons();

});

$(document).on("click", ".food-btn", displayGif);

renderButtons();

