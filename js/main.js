$(".tile").on("click", function(e) {
  $(this).css("background-color", "blue");
});


$(document).ready(function() {


  //grab dom elements
  let gridSize = 9;
  const gameContainer = $("#game-container");
  const tileInsert = "<div class='tile'></div>";
  const rowInsert = "<div class='row game-row'></div>"


  //populate game-rows

  function addRows() {
    for (let i = 0; i < gridSize; i++) {
      $("#game-container").append(rowInsert);
    };
  }

addRows();

  const gameRow = $(".game-row")

  //populate tiles
  function addColumns() {
    _.forEach(gameRow, function(el, index) {
      for (let i = 0; i < gridSize; i++) {
        $(el).append(tileInsert);
      }
    })
  };

  addColumns();

  const tiles = $(".tile");
  //assign column and row numbers as classes to grid
  function assignClasses() {
    _.forEach(gameRow, function(el, index) {
      let rowToAdd = ("r" + (index + 1));
      $(el).addClass(rowToAdd);
      let populatedTile = $(el).find(".tile");
      _.forEach(populatedTile, function(el, index) {
        let columnToAdd = ("c" + (index + 1));
        $(el).addClass(columnToAdd);
      });
    });
  };

  assignClasses();
});
