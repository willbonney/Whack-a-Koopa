

const Peach = function(){
  this.health = 1;
  this.friendly = true;
}
const Koopa = function(){
  this.health = 1;
  this.friendly = false;
  this.colors = ["red", "green"];
  this.color = _.sample(this.colors);
  this.imageSrc = "images/koopa-" + this.color + ".png";
  this.sound = "sounds/koopa.wav";
}

const Bowser = function(){
  this.health = 5;
  this.friendly = false;
  this.imageSrc = "images/bowser.png";
  this.sound = "sounds/bowser.wav";
}


// Koopa.prototype.finished = function() {
//   if(this.correctPairs === 12){
//     alert("win");
//   }
// };
//Enemy constructor


//Powerup constructor

//array of constructor objects

koopa = new Koopa();
koopa2 = new Koopa();
koopa3 = new Koopa();
bowser = new Bowser();

const unitCollection = [koopa, koopa2, koopa3, bowser];

//math random select item from array



$(document).ready(function() {


  //grab dom elements
  let gridSize = 5;
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
  const tiles = $(".tile");

  addColumns();

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



  $(".tile").on("click", function(e) {
    const selectedUnit = _.sample(unitCollection);
    console.log(selectedUnit.imageSrc);
    $(this).css("background", `url(${selectedUnit.imageSrc})`);
    // $(this).css("background-size", "contain");
  });



  //grow gridSize
  function growGridSize(increase){
    $("#game-container").empty();
    gridSize += increase;
    addRows();
    addColumns();
    assignClasses();
  };

  setTimeout(function(){
    growGridSize(2);},5000);


//counter


});
