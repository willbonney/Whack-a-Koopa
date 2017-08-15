$.fn.extend({
  animateCss: function(animationName) {
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    this.addClass('animated ' + animationName).one(animationEnd, function() {
      $(this).removeClass('animated ' + animationName);
    });
    return this;
  }
});


const Thwomp = function() {
  this.name = "thwomp";
  this.health = 1;
  this.points = -5;
  this.imageSrc = "images/thwomp.png";
}
const Peach = function() {
  this.name = "peach";
  this.health = 1;
  this.points = 1;
  this.imageSrc = "images/peach.png";
}
const Koopa = function() {
  this.health = 1;
  this.points = 1;
  this.colors = ["red", "green", "white", "wings", "mecha", "blue"];
  this.color = _.sample(this.colors);
  this.imageSrc = "images/koopa-" + this.color + ".png";
}

const Goomba = function() {
  this.health = 1;
  this.points = 1;
  this.imageSrc = "images/goomba.png";
}

const Bowser = function() {
  this.health = 5;
  this.points = 5;
  this.imageSrc = "images/bowser.png";
}

const Ghost = function() {
  this.name = "ghost";
  this.health = 1;
  this.points = -5;
  this.imageSrc = "images/ghost.png"
}
const Oneup = function() {
  this.name = "oneup";
  this.health = 10;
  this.points = 10;
  this.imageSrc = "images/oneup.png"
}
const Piranha = function() {
  this.name = "piranha";
  this.health = 1;
  this.points = -5;
  this.imageSrc = "images/piranha.png"
}

const Mushroom = function() {
  this.name = "mushroom";
  this.health = 3;
  this.points = 5;
  this.imageSrc = "images/mushroom.png";
}

const Bomb = function() {
  this.health = 1;
  this.points = -3;
  this.imageSrc = "images/bomb.png";
}

const Star = function() {
  this.health = 5;
  this.points = 10;
  this.imageSrc = "images/star.png";
}

const Yoshi = function() {
  this.health = 1;
  this.points = 10;
  this.imageSrc = "images/yoshi.png";
}

Thwomp.prototype.gotClicked = function() {
  $("#thwomp-sound")[0].play();
  $(".tile").css("width", "20px");
  $(".tile").css("height", "20px");
  setInterval(function() {
    $(".tile").css("width", "100px");
    $(".tile").css("height", "100px");
  }, 5000);
};

Peach.prototype.gotClicked = function() {
  $("#peach-sound")[0].play();
  alert("You whacked the pricess, Game Over!");
  clearInterval(flipInterval); //not defined
  clearInterval(unflipInterval); //not defined
  return;
};

Koopa.prototype.gotClicked = function() {
  $("#koopa-sound")[0].play();
};

Goomba.prototype.gotClicked = function() {
  $("#goomba-sound")[0].play();
};

Ghost.prototype.gotClicked = function() {
  $("#ghost-sound")[0].play();
  $("#game-container").css("opacity", 0.05);
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
    $("#mushroom-sound")[0].play();
    mushroomPower = true;
    $("#status-text").append("<div> Mushroom Power Activated! </div>");
    $("#status-text").animate({
      "scrollTop": $('#status-text')[0].scrollHeight
    }, "fast");
    $("#mushroom-icon").show()
    setTimeout(function() {
      mushroomPower = false;
      $("#mushroom-icon").hide()
    }, 15000);
  };

};


Oneup.prototype.gotClicked = function(name, health) {

  if (health === 0) {
    $("#oneup-sound")[0].play();
    $("#shrink-grid").trigger("click");
  }
};

Piranha.prototype.gotClicked = function(name, health) {
  $("#piranha-sound")[0].play();
  $("#grow-grid").trigger("click");
};

Bowser.prototype.gotClicked = function(name, health) {
  $("#bowser-sound")[0].play();
  console.log("Bowser clicked");
};
Bomb.prototype.gotClicked = function(name, health) {
  $("#bomb-sound")[0].play();
  $("#fast-button").trigger("click");
};
Star.prototype.gotClicked = function(name, health) {
  if (health === 0) {
    $("#star-sound")[0].play();
    console.log("health is one");
    $("#slow-button").trigger("click");
  }
};

Yoshi.prototype.gotClicked = function(name, health) {
  $("#yoshi-sound")[0].play();
  $("#yoshi-button").show();

};

koopa = new Koopa();
koopa2 = new Koopa();
koopa3 = new Koopa();
koopa4 = new Koopa();
koopa5 = new Koopa();
koopa6 = new Koopa();
koopa7 = new Koopa();
koopa8 = new Koopa();
koopa9 = new Koopa();
koopa10 = new Koopa();
koopa11 = new Koopa();
koopa12 = new Koopa();
koopa13 = new Koopa();
koopa14 = new Koopa();
koopa15 = new Koopa();
koopa16 = new Koopa();
koopa17 = new Koopa();
koopa18 = new Koopa();
koopa19 = new Koopa();
koopa20 = new Koopa();
goomba = new Goomba();
goomba2 = new Goomba();
goomba3 = new Goomba();
goomba4 = new Goomba();
goomba5 = new Goomba();
goomba6 = new Goomba();
goomba7 = new Goomba();
goomba8 = new Goomba();
goomba9 = new Goomba();
goomba10 = new Goomba();
thwomp = new Thwomp();
thwomp2 = new Thwomp();
thwomp3 = new Thwomp();
thwomp4 = new Thwomp();
thwomp5 = new Thwomp();
bowser = new Bowser();
bowser2 = new Bowser();
bowser3 = new Bowser();
peach = new Peach();
peach2 = new Peach();
peach3 = new Peach();
ghost = new Ghost();
ghost2 = new Ghost();
ghost3 = new Ghost();
ghost4 = new Ghost();
ghost5 = new Ghost();
mushroom = new Mushroom();
mushroom2 = new Mushroom();
yoshi = new Yoshi();
bomb = new Bomb();
bomb2 = new Bomb();
bomb3 = new Bomb();
oneup = new Oneup();
piranha = new Piranha();
piranha2 = new Piranha();
piranha3 = new Piranha();
piranha4 = new Piranha();
piranha5 = new Piranha();
star = new Star();

const unitCollection = [
  oneup,
  piranha, piranha2, piranha3, piranha4, piranha5,
  star,
  goomba, goomba2, goomba3, goomba4, goomba5, goomba6, goomba7, goomba8, goomba9, goomba10,
  koopa, koopa2, koopa3, koopa4, koopa5, koopa6, koopa7, koopa8, koopa10, koopa11, koopa12, koopa13, koopa14, koopa15, koopa16, koopa17, koopa18, koopa19, koopa20,
  bomb, bomb2, bomb3,
  bowser, bowser2, bowser3,
  peach, peach2, peach3,
  ghost, ghost2, ghost3, ghost4, ghost5,
  mushroom, mushroom2,
  yoshi,
  thwomp, thwomp2, thwomp3, thwomp4, thwomp5
];


let points = 0;
let gridSize = 6;
let flipSpeed = 600;
let maxFlipped = 9;
let mushroomPower = false;
let tileCountdownArray = [];
let customSettings = false;

$(document).ready(function() {
  $("#toggle-dev").on("click", function() {
    console.log("dev");
    $("#dev-buttons").show();
  });
  $('#myModal').modal('show');

  $('#custom-mode').on("click", function() {
    $('#custom-fields').toggle();
    customSettings = !customSettings;
  });

  $("#easy-mode").on("click", function() {
    gridSize = 4;
    flipSpeed = 800;
    maxFlipped = 11;
    modifyGrid();
  });

  $("#medium-mode").on("click", function() {
    gridSize = 6;
    flipSpeed = 600;
    maxFlipped = 9;
    modifyGrid();
  });

  $("#hard-mode").on("click", function() {
    gridSize = 8;
    flipSpeed = 400;
    maxFlipped = 7;
    modifyGrid();
  });

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

  function modifyGrid() {
    $("#game-container").empty();
    addRows(gridSize);
    gameRow = $(".game-row");
    addColumns(gridSize);
    tiles = $(".tile");
    assignClasses();
  }

  //grow gridSize
  function growGridSize(increase) {
    if (gridSize >= 8) {
      console.log("larger than 8");
      return;
    } else {
      gridSize += increase;
      let gridSizeStatus = '<div> Grid Size changed to ' + gridSize + '</div>';
      $('#status-text').append(gridSizeStatus);
      $("#status-text").animate({
        "scrollTop": $('#status-text')[0].scrollHeight
      }, "fast");
      console.log("new gridsize is", gridSize);
      modifyGrid();
      tileCountdownArray.length = 0;
      $("#start-button").trigger("click");
    }

  };

  //shrink gridSize
  function shrinkGridSize(decrease) {
    if (gridSize <= 4) {
      console.log("smaller than 6");
      return;
    } else {
      gridSize -= decrease;
      let gridSizeStatus = '<div> Grid Size changed to ' + gridSize + '</div>';
      $('#status-text').append(gridSizeStatus);
      $("#status-text").animate({
        "scrollTop": $('#status-text')[0].scrollHeight
      }, "fast");
      console.log("new grid size is " + gridSize);
      modifyGrid();
      tileCountdownArray.length = 0;
      $("#start-button").trigger("click");
    }
  };

  $("#grow-grid").on("click", function() {
    console.log("grow");
    growGridSize(1);
  });

  $("#shrink-grid").on("click", function() {
    console.log("shrink", "speed is ", flipSpeed);
    shrinkGridSize(1);
  });

  //start game logic
  $("#start-button").on("click", function() {
    $("#start-sound")[0].play();
    $('#myModal').modal('hide');
    $('#status-text').append(`<div>Grid Size: ${gridSize}</div>`);
    $('#status-text').append(`<div>Game Speed: ${flipSpeed}</div>`);
    $('#status-text').append(`<div>Max Flipped Tiles: ${maxFlipped}</div>`);

    if(customSettings){
      customSettings = false;
      const customSpeed = _.toNumber($("#speed-input").val());
      const customGrid = _.toNumber($("#grid-input").val());
      const customFlipped = _.toNumber($("#flipped-input").val());
      console.log("Custom Flip Speed = ", customFlipped, "Custom Grid Size = ", customGrid,"Custom Game Speed = ", customSpeed);
      flipSpeed = customSpeed;
      gridSize = customGrid;
      maxFlipped = customFlipped;
      modifyGrid();
    };

    $(".tile").data("unit", {
      health: 0
    });

    function updateScore() {
      $("#points").text(points);

      if (points >= 100) {
        $("#win-sound")[0].play();
        alert("You reached 100 points, You Win!");
        clearInterval(flipInterval);
        clearInterval(unflipInterval);
      }
      if (points <= -100) {
        $("#lose-sound")[0].play();
        alert("You reached -100 points, Game Over!");
        clearInterval(flipInterval);
        clearInterval(unflipInterval);
      }
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
        console.log("oldestTile", oldestTile);
        oldestTile.removeClass("flipped");
        oldestTile.css("background", "url('images/block.png')");
        oldestTile.find(".unit-health").remove();
        _.remove(tileCountdownArray, oldestTile);
        points -= oldestTile.data("unit").health;
        updateScore();
      } else {
        return;
      }
    }

    let unflipInterval = setInterval(unflip, flipSpeed);


    $(".tile").on("click", function() {
      if ($(this).hasClass("flipped")) {

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
          $(this).animateCss("rotateOut");
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
          let numberFlipped = $(".flipped").length;
          let flippedTiles = $(".flipped");
          for (let i = 0; i < numberFlipped; i++) {
            let yoshiFlip = flippedTiles[i];

            killIt($(yoshiFlip), false);

            $(yoshiFlip).animateCss("shake");
            $(yoshiFlip).removeData();

            $("#yoshi-button").hide();
          }; //yoshi for loop end

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
        console.log("speed limit exceeded");
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
