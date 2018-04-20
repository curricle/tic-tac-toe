$(document).ready(function (){

  var playerTick = "x";
  var aiTick = "o";
  var boxArr = [];
  var playerArr = [];
  var aiArr = [];
  var winCondition = false;
  var winningArr = [];

//create an array for all of the available spaces
  function resetArr() {
    for(var i = 0; i < 9; i++) {
      boxArr[i] = "b" + (i+1);
    }
    playerArr = [];
    aiArr = [];
  }


//create an array for the possible win conditions
var winArr = [
  ["b1", "b2", "b3"],
  ["b1", "b4", "b7"],
  ["b1", "b5", "b9"],
  ["b2", "b5", "b8"],
  ["b3", "b6", "b9"],
  ["b3", "b5", "b7"],
  ["b4", "b5", "b6"],
  ["b7", "b8", "b9"]
];

  function updateDisplay(m, m2, m3) {
    var mm = "#" + m;
    var mm2 = "#" + m2;
    var mm3 = "#" + m3;
    console.log(mm3);

    $(mm).addClass("winLine");
    $(mm2).addClass("winLine");
    $(mm3).addClass("winLine");

    $(".ticbox").off("click");

    setTimeout(function() {
      $(mm).removeClass("winLine");
      $(mm2).removeClass("winLine");
      $(mm3).removeClass("winLine");
      startGame();
    }, 3000);
  }

//checks for win condition
  function hasWon(arr) {

    for(var i = 0; i < winArr.length; i++) {
      for(var y = 0; y < winArr[i].length; y++){
        if(arr.indexOf(winArr[i][y]) !== -1 && arr.indexOf(winArr[i][y+1]) !== -1 && arr.indexOf(winArr[i][y+2]) !== -1) {
          winningArr.push(winArr[i][y]);
          winningArr.push(winArr[i][y+1]);
          winningArr.push(winArr[i][y+2]);
          updateDisplay(winArr[i][y], winArr[i][y+1], winArr[i][y+2])
          winCondition = true;
          console.log("player has won!");
          if(arr === aiArr) {
            $(".winMessage").html("<h3>Computer has won!</h3>");
          }
          else if (arr === playerArr) {
            $(".winMessage").html("<h3>You won!</h3>");
          }
          }
        }
      }
    }

//update array when spaces are taken
  function updateArr(b) {
    boxArr.splice(boxArr.indexOf(b), 1);
  }

//minmax function
  function getRandom(mn, mx) {
    var rand = Math.floor(Math.random()*(mx-mn+1)+mn);
    return rand;
  }

//controls AI movements
  function aiTurn() {
    console.log("ai turn activated");
    var min = 0;
    var max = boxArr.length - 1;

    if(max > 0) {
      var selectedBoxId = boxArr[getRandom(min, max)];
      var aiTurnBox = "#" + selectedBoxId;
      $(aiTurnBox).html(aiTick);
      updateArr(selectedBoxId);
      aiArr.push(selectedBoxId);
      hasWon(aiArr);
      $(aiTurnBox).off('click');
      console.log("AI has chosen " + selectedBoxId);
      console.log(aiArr);
    }
  }


//instantiate array
  function startGame() {
    winCondition = false;
    resetArr();
    playerTurn();
    $("#xButton").off("click");
    $("#oButton").off("click");
    $(".winMessage").html("");
    $(".ticbox").html("");
  }


  function playerTurn() {
    //player turn
      $(".ticbox").on("click", function() {
        var currentBox = $(this).attr('id');
        var currentId = "#" + currentBox;
        $(currentId).html(playerTick);
        console.log("player has chosen " + currentBox);

        //update available spaces array
        updateArr(currentBox);

        //add chosen space to player's array
        playerArr.push(currentBox);
        console.log("current player's positions: " + playerArr);
        //make chosen space unclickable
        $(currentId).off('click');
        if(playerArr.length >= 3) {
          hasWon(playerArr);
        }
        if(winCondition === false) {
          if(boxArr.length >= 1) {
            setTimeout(aiTurn, 500);
          }
          else {
            $(".winMessage").html("<h3>Draw</h3>");
            setTimeout(startGame, 3000);
          }
        }
      });
    }

//start of game code
  $("ticbox").off("click");
  $("#xButton").on("click", function() {
    playerTick = "x";
    aiTick = "o";
    $("#xButton").addClass("disabled");
    $("#oButton").addClass("disabled");
    startGame();
  });
  $("#oButton").on("click", function() {
    playerTick = "o";
    aiTick = "x";
    $("#xButton").addClass("disabled");
    $("#oButton").addClass("disabled");
    startGame();
  });

});
