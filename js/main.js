const Peach = function() {
  this.health = 1;
  this.friendly = true;
  this.points = 1;
  this.imageSrc = "images/peach.jpg";
  this.sound = "sounds/bowser.wav";
}
const Koopa = function() {
  this.health = 1;
  this.friendly = false;
  this.points = 1;
  this.colors = ["red", "green"];
  this.color = _.sample(this.colors);
  this.imageSrc = "images/koopa-" + this.color + ".png";
  this.sound = "sounds/koopa.wav";
}

const Goomba = function() {
  this.health = 1;
  this.friendly = false;
  this.points = 1;
  this.imageSrc = "images/goomba.png";
  this.sound = "sounds/goomba.wav";;
}

const Bowser = function() {
  this.health = 5;
  this.friendly = false;
  this.points = 5;
  this.imageSrc = "images/bowser.png";
  this.sound = "sounds/bowser.wav";
}


Bowser.prototype.gotClicked = function() {
  console.log("Bowser clicked");
};
//Enemy constructor


//Powerup constructor

const Mushroom = function() {
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
peach = new Peach();

const unitCollection = [koopa, koopa2, koopa3, bowser, peach];


let gridSize = 8;
let flipSpeed = 300;
let maxFlipped = 30;
let tileImgSrc = "images/mushroom.png";


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
    let tileCountdownArray = [];
    $(".tile").data("unit", {
      health: 0
    });

    function updateScore() {
      $("#points").text(points);

    }

    setInterval(function() {
      //flip tile
      const rowRandom = _.random(1, gridSize);
      const colRandom = _.random(1, gridSize);
      const tileRandom = ".r" + rowRandom + " .c" + colRandom;
      const chosenTile = $(tileRandom);
      tileCountdownArray.push(chosenTile);
      if (chosenTile.hasClass("flipped")) {
        //getting slow at end
        // return;
        //do nothing

      } else {
        chosenTile.addClass("flipped");
        const chosenUnit = _.sample(unitCollection);
        const friendly = chosenUnit.friendly;
        const health = chosenUnit.health;
        const points = chosenUnit.points;
        const clickFunction = chosenUnit.gotClicked;
        const chosenImg = "url('" + chosenUnit.imageSrc + "')";
        chosenTile.css("background", chosenImg);
        $(chosenTile).data("unit", {
          health: health,
          friendly: friendly,
          click: clickFunction,
          points: points

        });

      };

    }, flipSpeed); //setInterval end



    $("#mushroom-button").on("click", function() {
      mushroom = true;
    });



    $(".tile").on("click", function() {
      if ($(this).hasClass("flipped")) {
        const unitPoints = $(this).data("unit").points;
        const unitFriendly = $(this).data("unit").friendly;
        const unitClick = $(this).data("unit").click;
        const clickCol = $(this).attr('class').match(/\bc(\d+)\b/)[1];
        const clickRow = $(this).parent().attr('class').match(/\br(\d+)\b/)[1];
        console.log("clicked on", "r" + clickRow, "c" + clickCol);
        console.log("col", typeof(clickCol), "row", typeof(clickRow));

        function clickSuccess(target) {
          points += unitPoints;
          //update score
          updateScore();
          $(target).removeClass("flipped");
          $(target).css("background", "black");
          _.remove(tileCountdownArray, $(target));
          $(target).removeData();
        }


        //if clikc powerup, set state


        $(this).data("unit").health -= 1;

        if (unitFriendly === true) {
          alert("you lose");
          return;
        }



        if (mushroom) {
          const upOne = _.toNumber(clickRow) - 1;
          const downOne = _.toNumber(clickRow) + 1;
          const leftOne = _.toNumber(clickCol) - 1;
          const rightOne = _.toNumber(clickCol) + 1;
          const upOneEl = $(".r" + upOne + " .c" + _.toNumber(clickCol));
          const downOneEl = $(".r" + downOne + " .c" + _.toNumber(clickCol));
          const leftOneEl = $(".r" + _.toNumber(clickRow) + " .c" + leftOne);
          const rightOneEl = $(".r" + _.toNumber(clickRow) + " .c" + rightOne);

          upOneEl.addClass("animated bounce");
          downOneEl.addClass("animated bounce");
          leftOneEl.addClass("animated bounce");
          rightOneEl.addClass("animated bounce");

          //
          console.log("up", upOneEl, upOne);
          console.log("down", downOneEl, downOne);;
          // console.log(upOneEl.data().unit.health);

          upOneEl.data("unit").health -= 1;
          downOneEl.data("unit").health -= 1;
          leftOneEl.data("unit").health -= 1;
          rightOneEl.data("unit").health -= 1;

          //if any die, clickSuccess

          if (upOneEl.data("unit").health === 0) {
            clickSuccess(upOneEl);
          }
          if (downOneEl.data("unit").health === 0) {
            clickSuccess(downOneEl);
          }
          if (leftOneEl.data("unit").health === 0) {
            clickSuccess(leftOneEl);
          }
          if (rightOneEl.data("unit").health === 0) {
            clickSuccess(rightOneEl);
          }

        }//end mushroom

        if ($(this).data("unit").health === 0) {
          clickSuccess(this);
        }
      }

    });


    setInterval(function() {
      if (tileCountdownArray.length > maxFlipped) {
        const oldestTile = _.head(tileCountdownArray);
        oldestTile.removeClass("flipped");
        oldestTile.css("background", "black");
        _.remove(tileCountdownArray, oldestTile);

        points -= oldestTile.data("unit").health;;
        //update score
        updateScore();
      }
    }, flipSpeed);


    //yoshi setInterval not working
    $("#yoshi-button").on("click", function() {
      const numberFlipped = $(".flipped").length;
      for (let i = 0; i < numberFlipped; i++) {
        let flippedTiles = $(".flipped");
        console.log("flipped array", flippedTiles);
        let yoshiFlip = flippedTiles[0];
        // let yoshiFlip = _.sample(flippedTiles);
        console.log("sampled array", yoshiFlip);
        let yoshiPoints = $(yoshiFlip).data().unit.points;
        $(yoshiFlip).addClass("animated bounce");
        // $(yoshiFlip).removeClass("animated bounce");
        $(yoshiFlip).removeClass("flipped");
        $(yoshiFlip).css("background", "green");
        $(yoshiFlip).removeData();
        points += yoshiPoints;
        updateScore();
      };
      //remove yoshi button
    });




  });

});
