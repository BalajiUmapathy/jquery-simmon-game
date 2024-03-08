var level = 0;
var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

$(document).on("keydown", function() {
    newSequence();
    $("h1").text("Level " + level);
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] !== gamePattern[currentLevel]) {
        // Wrong answer, reset game
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
    
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
      
    } else {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                newSequence(); 
            }, 1000);
        }
    }
}

function newSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();

    $(".btn").off("click").on("click", function() {
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
        $(this).addClass("pressed");
        setTimeout(function() {
            $(this).removeClass("pressed");
        }.bind(this), 100);
    });

    level++;
}











