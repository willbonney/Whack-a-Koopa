$.fn.extend({
  animateCss: function(animationName) {
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    this.addClass('animated ' + animationName).one(animationEnd, function() {
      $(this).removeClass('animated ' + animationName);
    });
    return this;
  }
});


const Peach = function() {
  this.name = "peach";
  this.health = 1;
  this.points = 1;
  this.imageSrc = "images/peach.png";
  this.sound = "sounds/peach.wav";
}
const Koopa = function() {
  this.health = 1;
  this.points = 1;
  this.colors = ["red", "green", "white", "wings", "mecha", "blue"];
  this.color = _.sample(this.colors);
  this.imageSrc = "images/koopa-" + this.color + ".png";
  this.sound = "sounds/koopa.wav";
}

const Goomba = function() {
  this.health = 1;
  this.points = 1;
  this.imageSrc = "images/goomba.png";
  this.sound = "sounds/goomba.wav";;
}

const Bowser = function() {
  this.health = 5;
  this.points = 5;
  this.imageSrc = "images/bowser.png";
  this.sound = "sounds/bowser.wav";
}

const Ghost = function() {
  this.name = "ghost";
  this.health = 1;
  this.points = -5;
  this.imageSrc = "images/ghost.png"
  this.sound = "sounds/ghost.wav"
}
const Oneup = function() {
  this.name = "oneup";
  this.health = 10;
  this.points = 10;
  this.imageSrc = "images/oneup.png"
  this.sound = "sounds/oneup.wav"
}
const Piranha = function() {
  this.name = "piranha";
  this.health = 1;
  this.points = -5;
  this.imageSrc = "images/piranha.png"
  this.sound = "sounds/piranha.wav"
}

const Mushroom = function() {
  this.name = "mushroom";
  this.health = 3;
  this.points = 5;
  this.imageSrc = "images/mushroom.png";
  this.sound = "sounds/mushroom.wav";
}

const Bomb = function() {
  this.health = 1;
  this.points = -3;
  this.imageSrc = "images/bomb.png";
  this.sound = "sounds/bomb.wav";
}

const Star = function() {
  this.health = 5;
  this.points = 10;
  this.imageSrc = "images/star.png";
  this.sound = "sounds/star.wav";
}

const Yoshi = function() {
  this.health = 1;
  this.points = 10;
  this.imageSrc = "images/yoshi.png";
  this.sound = "sounds/yoshi.wav";
}


Peach.prototype.gotClicked = function() {
  alert("you lose");
  clearInterval(flipInterval); //not defined
  return;
};

Koopa.prototype.gotClicked = function() {
  console.log(this);
};

Goomba.prototype.gotClicked = function() {
  console.log(this);
};

Ghost.prototype.gotClicked = function() {
  $("#game-container").css("opacity", 0.02);
  $("#status-text").append("<div> Blinded! </div>")
  $("#status-text").animate({
    "scrollTop": $('#status-text')[0].scrollHeight
  }, "fast");

  setTimeout(function() {
    $("#game-container").css("opacity", 1)
  }, 3000);
};

Mushroom.prototype.gotClicked = function(name, health) {

  if (name === "mushroom" && health === 1) {
    mushroomPower = true;
    console.log("mushroom proto");
    setTimeout(function() {
      mushroomPower = false;
    }, 15000);
  };

};


Oneup.prototype.gotClicked = function(name, health) {
  if (health === 0) {
    $("#shrink-grid").trigger("click");
  }
};

Piranha.prototype.gotClicked = function(name, health) {
  $("#grow-grid").trigger("click");
};

Bowser.prototype.gotClicked = function(name, health) {
  console.log("Bowser clicked");
};
Bomb.prototype.gotClicked = function(name, health) {
  $("#fast-button").trigger("click");
};
Star.prototype.gotClicked = function(name, health) {
  if (health === 0) {
    console.log("health is one");
    $("#slow-button").trigger("click");
  }
};

Yoshi.prototype.gotClicked = function(name, health) {
  $("#yoshi-button").show();

};

koopa = new Koopa();
koopa2 = new Koopa();
koopa3 = new Koopa();
bowser = new Bowser();
peach = new Peach();
ghost = new Ghost();
mushroom = new Mushroom();
yoshi = new Yoshi();
yoshi2 = new Yoshi();
bomb = new Bomb();
oneup = new Oneup();
piranha = new Piranha();
star = new Star();

const unitCollection = [oneup,
  piranha,
  star,
  koopa,
  koopa2,
  koopa3,
  bomb,
  bowser,
  peach,
  ghost,
  mushroom,
  yoshi,
  yoshi2
];


let points = 0;
let gridSize = 6;
let flipSpeed = 600;
let maxFlipped = 10;
let mushroomPower = false;
let tileCountdownArray = [];

$(document).ready(function() {

  //win loss conditions

  //

  //grab dom elements
  const gameContainer = $("#game-container");
  const tileInsert = "<div class='tile'></div>";
  const rowInsert = "<div class='row game-row'></div>"
  //populate game-rows
  function addRows(amount) {
    for (let i = 0; i < amount; i++) {
      $("#game-container").append(rowInsert);
    };
  }

  addRows(gridSize);

  let gameRow = $(".game-row")

  //populate tiles
  function addColumns(amount) {
    _.forEach(gameRow, function(el, index) {
      for (let i = 0; i < amount; i++) {
        $(el).append(tileInsert);
      }
    })
  };

  let tiles = $(".tile");

  addColumns(gridSize);

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
    if (gridSize >= 8) {
      console.log("larger than 8");
      return;
    } else {
      $("#game-container").empty();
      gridSize += increase;
      let gridSizeStatus = '<div> Grid Size changed to ' + gridSize + '</div>';
      $('#status-text').append(gridSizeStatus);
      $("#status-text").animate({
        "scrollTop": $('#status-text')[0].scrollHeight
      }, "fast");
      console.log("new gridsize is", gridSize);
      addRows(gridSize);
      gameRow = $(".game-row");
      addColumns(gridSize);
      tiles = $(".tile");
      assignClasses();
      tileCountdownArray.length = 0;
      $("#start-button").trigger("click");
    }

  };

  //shrink gridSize
  function shrinkGridSize(decrease) {
    if (gridSize <= 6) {
      console.log("smaller than 6");
      return;
    } else {
      $("#game-container").empty();
      gridSize -= decrease;
      let gridSizeStatus = '<div> Grid Size changed to ' + gridSize + '</div>';
      $('#status-text').append(gridSizeStatus);
      $("#status-text").animate({
        "scrollTop": $('#status-text')[0].scrollHeight
      }, "fast");
      console.log("new grid size is " + gridSize);
      addRows(gridSize);
      gameRow = $(".game-row")
      addColumns(gridSize);
      tiles = $(".tile");
      assignClasses();
      tileCountdownArray.length = 0;
      $("#start-button").trigger("click");
    }
  };


  $("#grow-grid").on("click", function() {
    console.log("grow");
    growGridSize(1);
  });


  $("#shrink-grid").on("click", function() {
    console.log("shrink");
    shrinkGridSize(1);
  });


  //start game logic
  $("#start-button").on("click", function() {
    $(".tile").data("unit", {
      health: 0
    });

    function updateScore() {
      $("#points").text(points);

    }


    function flip() {
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
        const chosenImg = "url('" + chosenUnit.imageSrc + "')";
        chosenTile.css("background", chosenImg);
        chosenTile.append("<span class='unit-health'>" + chosenUnit.health + "</span>")
        $(chosenTile).data("unit", {
          name: chosenUnit.name,
          health: chosenUnit.health,
          click: chosenUnit.gotClicked,
          points: chosenUnit.points

        });

      };

    }

    let flipInterval = setInterval(flip, flipSpeed);
    //need to reset this?
    function unflip() {
      if (tileCountdownArray.length > maxFlipped) {
        const oldestTile = _.head(tileCountdownArray);
        oldestTile.removeClass("flipped");
        oldestTile.css("background", "url('images/block.png')");
        oldestTile.find(".unit-health").remove();
        _.remove(tileCountdownArray, oldestTile);

        points -= oldestTile.data("unit").health;;
        updateScore();
      }
    }

    let unflipInterval = setInterval(unflip, flipSpeed);





    $(".tile").on("click", function() {
      if ($(this).hasClass("flipped")) {
        $(this).animateCss("pulse");

        $(this).data("unit").health -= 1;
        $(this).find(".unit-health").html($(this).data("unit").health); //so ugly

        const unitPoints = $(this).data("unit").points;
        const unitName = $(this).data("unit").name;
        const unitHealth = $(this).data("unit").health;
        const unitClick = $(this).data("unit").click;
        const clickCol = $(this).attr('class').match(/\bc(\d+)\b/)[1];
        const clickRow = $(this).parent().attr('class').match(/\br(\d+)\b/)[1];;

        unitClick(unitName, unitHealth); //pass things here

        if ($(this).data("unit").health === 0) {
          killIt(this);
        };



        if (mushroomPower === true) {

          console.log("inside mushroom");
          const upOne = _.toNumber(clickRow) - 1;
          const upOneFixed = upOne < 1 ? gridSize : upOne > gridSize ? 1 : upOne;
          const downOne = _.toNumber(clickRow) + 1;
          const downOneFixed = downOne < 1 ? gridSize : downOne > gridSize ? 1 : downOne;
          const leftOne = _.toNumber(clickCol) - 1;
          const leftOneFixed = leftOne < 1 ? gridSize : leftOne > gridSize ? 1 : leftOne;
          const rightOne = _.toNumber(clickCol) + 1;
          const rightOneFixed = rightOne < 1 ? gridSize : rightOne > gridSize ? 1 : rightOne;

          const upOneEl = $(".r" + upOneFixed + " .c" + _.toNumber(clickCol));
          const downOneEl = $(".r" + downOneFixed + " .c" + _.toNumber(clickCol));
          const leftOneEl = $(".r" + _.toNumber(clickRow) + " .c" + leftOneFixed);
          const rightOneEl = $(".r" + _.toNumber(clickRow) + " .c" + rightOneFixed);

          upOneEl.animateCss("bounce");
          downOneEl.animateCss("bounce");
          leftOneEl.animateCss("bounce");
          rightOneEl.animateCss("bounce");

          let upOneHealth = upOneEl.data("unit").health;
          let downOneHealth = downOneEl.data("unit").health;
          let leftOneHealth = leftOneEl.data("unit").health;
          let rightOneHealth = rightOneEl.data("unit").health;


          if (typeof upOneHealth !== "undefined") {
            upOneHealth -= 1;
            if (upOneHealth === 0) {
              killIt(upOneEl);
            }
          };
          if (typeof downOneHealth !== "undefined") {
            downOneHealth -= 1
            if (downOneHealth === 0) {
              killIt(downOneEl);
            }
          };
          if (typeof rightOneHealth !== "undefined") {
            rightOneHealth -= 1
            if (rightOneHealth === 0) {
              killIt(rightOneEl);
            }
          };
          if (typeof leftOneHealth !== "undefined") {
            leftOneHealth -= 1
            if (leftOneHealth === 0) {
              killIt(leftOneEl);
            }
          };



        } //end mushroom



        function killIt(target, givePoints = true) {
          if (givePoints === true) {
            points += unitPoints;
          }
          //update score
          updateScore();
          $(target).removeClass("flipped");
          $(target).css("background", " url('images/block.png')");
          _.remove(tileCountdownArray, $(target));
          $(target).data("unit").health = 0;
          $(target).find(".unit-health").remove();
        };

        //yoshi setInterval not working
        $("#yoshi-button").on("click", function() {
          const numberFlipped = $(".flipped").length;
          for (let i = 0; i < numberFlipped; i++) {
            let flippedTiles = $(".flipped");
            let yoshiFlip = flippedTiles[i];


            killIt($(yoshiFlip), false);

            $(yoshiFlip).animateCss("shake");
            $(yoshiFlip).removeData();

            $("#yoshi-button").hide();
          }; //for loop end

        }); //yoshi onclick end

      }; //if this hasclass flipped end




    }); //tile onclick end
    $("#fast-button").on("click", function() {
      changeSpeed(-200);
    });

    $("#slow-button").on("click", function() {
      changeSpeed(200);
    });

    function changeSpeed(change) {
      if ((flipSpeed + change) < 200 || (flipSpeed + change) > 1200) {

      } else {
        clearInterval(flipInterval);
        clearInterval(unflipInterval);
        flipSpeed += change;

        flipInterval = setInterval(flip, flipSpeed);
        unflipInterval = setInterval(unflip, flipSpeed);

        let speedStatus = '<div> Game Speed changed to ' + flipSpeed + '</div>';
        $('#status-text').append(speedStatus);
        $("#status-text").animate({
          "scrollTop": $('#status-text')[0].scrollHeight
        }, "fast");
        console.log("new speed is " + flipSpeed);
      }
    };
  }); //start onclick end

  //win loss conditions

});
