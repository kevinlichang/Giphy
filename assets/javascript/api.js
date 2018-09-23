var foodsArr = ["pizza", "cheeseburger", "spaghetti", "buffalo wings"];


function displayGif() {
  $("#gif-view").empty();

  var food = $(this).attr("data-name");
  apiKey = "JxgQChtKt7o28Ndn94wSb0QhXj2uRJBH"
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + food;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
   
    console.log(response);
    for (var i = 0; i < response.data.length; i++) {
      var gifDiv = $('<img class="food" height="300">');
      gifDiv
        .attr("src", response.data[i].images.downsized_large.url)
        .appendTo($("#gif-view"))
    };
  });
}

function renderButtons() {
  $("#buttons-view").empty();

  for (var i = 0; i < foodsArr.length; i++) {
    var btnCreate = $("<button>")

    btnCreate
      .addClass("food-btn")
      .attr("data-name", foodsArr[i])
      .text(foodsArr[i])
      .appendTo($("#buttons-view"))


  }
}


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

})
$(document).on("click", ".food-btn", displayGif);

renderButtons();

