
var userClickedPattern = [];

var gamePattern = [];
var level =0;
var started = false;
var buttonColours = ["red", "blue", "green", "yellow"];

$(document).keypress(function() {
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
  var randomNumber = Math.floor(Math.random()*4);
  level++;
  $("h1").text("level"+level);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
    console.log("sucess");
    if(gamePattern.length == userClickedPattern.length){
      setTimeout(function(){
        nextSequence()
      },1000);
    }
  }else {
    console.log("wrong");
    playSound("wrong");
    $("h1").text("Game Over, Press Any Key to Restart");
      $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    startOver();
  }
}

function startOver(){
  level =0;
  started = false;
  gamePattern =[];
}
