var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = []
var userClickedPattern = []


var started = false;
var level = 0

$("body").keypress(function () { 
    if (!started) {

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
}});

$(".btn").click(function () { 
        var  userChosenColour = $(this).attr('id');

        userClickedPattern.push(userChosenColour);

        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length-1);

    });

    
    
function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
      console.log("wrong");
      var audio = new Audio("sounds/" + "wrong" + ".mp3");
    audio.play();
     $('body').addClass("game-over"); 
    setTimeout(function() {
        $('body').removeClass('game-over');
    }, 200)
      
    startOver()
    }

}



function nextSequence() {
    userClickedPattern = [];
    level++

    $("h1").text("level " + level);

    var randomNumber = Math.floor(Math.random()*4);

    var randomChosenColour= buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    
    $('#' + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    console.log(gamePattern);

}

    


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $('#' + currentColour).addClass("pressed"); 
    setTimeout(function() {
        $('#' + currentColour).removeClass('pressed');
    }, 100)
}

function startOver(){
   gamePattern = []
   userClickedPattern = []
level= 0
started= false
 $("h1").text("Press A Key to Start");

}




