const Peach = function() {
  this.health = 1;
  this.friendly = true;
}
const Koopa = function() {
  this.health = 1;
  this.friendly = false;
  this.colors = ["red", "green"];
  this.color = _.sample(this.colors);
  this.imageSrc = "images/koopa-" + this.color + ".png";
  this.sound = "sounds/koopa.wav";
}

const Goomba = function() {
  this.health = 1;
  this.friendly = false;
  this.imageSrc = "images/goomba.png";
  this.sound = "sounds/goomba.wav";;
}

const Bowser = function() {
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

const Mushroom = function(){
  this.health = 1;
  this.friendly = true;
  this.imageSrc = "images/mushroom.png";
  this.sound = "sounds/sound.wav";
}
//mushroom
//flower
//yoshi
//star

//array of constructor objects

koopa = new Koopa();
koopa2 = new Koopa();
koopa3 = new Koopa();
bowser = new Bowser();

const unitCollection = [koopa, koopa2, koopa3, bowser];


let gridSize = 8;
let flipSpeed = 500;


$(document).ready(function() {


  //grab dom elements
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

  let gameRow = $(".game-row")

  //populate tiles
  function addColumns() {
    _.forEach(gameRow, function(el, index) {
      for (let i = 0; i < gridSize; i++) {
        $(el).append(tileInsert);
      }
    })
  };
  let tiles = $(".tile");

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


  //grow gridSize
  function growGridSize(increase) {
    $("#game-container").empty();
    gridSize += increase;
    addRows();
    gameRow = $(".game-row")
    addColumns();
    tiles = $(".tile");
    assignClasses();
  };


  //counter




  //start game logic
  $("#start-button").on("click", function() {
    let points = 0;

    setInterval(function() {
      //flip tile
      let rowRandom = _.random(1, gridSize);
      let colRandom = _.random(1, gridSize);
      let tileRandom = ".r" + rowRandom + " .c" + colRandom;
      let chosenTile = $(tileRandom);
      if (chosenTile.hasClass("flipped")) {
        //getting slow at end
        //do nothing
      } else {
        chosenTile.addClass("flipped");
        let chosenUnit = _.sample(unitCollection);
        let friendly = chosenUnit.friendly;
        let chosenImg = "url('" + chosenUnit.imageSrc + "')";
        chosenTile.css("background", chosenImg);
      };



      const flippedTiles = $(".flipped");

      //getting chaotic
      flippedTiles.on("click", function() {
        if (false) { //friendly?
          //lose game
          // else if poweruop, execute modifier

        } else { //clicked on enemy
          //define this outside???
          //get target's health
          //if target's health===0
          $(this).removeClass("flipped");
          $(this).css("background", "black");
          console.log(this, "enemy");
          points++;
          console.log(points);
          //else target's health--
        };
      });

      //update score
      $("#points").text(points);
      //yoshi setInterval not working
      $("#yoshi-button").on("click", function() {
        let yoshi = true;
        while (yoshi) {
          for (let i = 0; i < 3; i++) {
            setInterval(function() {
              let yoshiFlip = _.sample(flippedTiles)
              $(yoshiFlip).removeClass("flipped");
              $(yoshiFlip).css("background", "green");
            }, 1000);
          };
          yoshi = false;
        }
      });

    }, flipSpeed); //setInterval end

  });

});
