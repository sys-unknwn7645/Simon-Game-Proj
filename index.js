//Challenge Project//
//Udemy Course: The Complete 2023 Web Developement Bootcamp//
//Acknowledgement: Angela Yu (App Brewery) for starting files//
//By: sys-unknwn7645//

var colorSeq = ["red","yellow","green","blue"];
var userInp = [];
var autoSeqLog = [];
var timeDelay = 500;
var gameOn = "Wait";
var level = 1;


$(document).keydown(function (event){
    if (event.key == "s") {
    $("h1").html("Level "+level);
    playGame();
    }

})

//Function to Generate Random Color
function randColor() {
    return colorSeq[Math.floor(Math.random()*4)];
}

// Auto-Generated Seq
function autoSeq(l) {
    if (gameOn == "Pass"){
        var tmpLog = autoSeqLog;
        
    } else {
        var tmpLog = [];
        }
    
    for (let i = (l-1); i<l; i++){
        tmpLog.push(randColor());
    }
    return tmpLog;
}


//Play Sound Function
function playSound(colorInp) {
    switch (colorInp) {
        case "red": 
            var redSound = new Audio ("sounds/red.mp3");
            redSound.play();
            $("#"+colorInp).addClass("pressed");
            setTimeout(function(){
                $("#"+colorInp).removeClass("pressed");
            },timeDelay);          
            break;
    
            case "blue": 
            var blueSound = new Audio ("sounds/blue.mp3");
            blueSound.play();
            $("#"+colorInp).addClass("pressed");
            setTimeout(function(){
                $("#"+colorInp).removeClass("pressed");
            },timeDelay);             
            break;
    
            case "green": 
            var greenSound = new Audio ("sounds/green.mp3");
            greenSound.play();
            $("#"+colorInp).addClass("pressed");
            setTimeout(function(){
                $("#"+colorInp).removeClass("pressed");
            },timeDelay);            
            break;
    
            case "yellow": 
            var yellowSound = new Audio ("sounds/yellow.mp3");
            yellowSound.play();
            $("#"+colorInp).addClass("pressed");
            setTimeout(function(){
                $("#"+colorInp).removeClass("pressed");
            },timeDelay);       
            break;
    
        default:
            var wrongSound = new Audio ("sounds/wrong.mp3");
            wrongSound.play();
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            },50);   
             
            break;
    }
}


//Run Functions
function playGame(){

    autoSeqLog = autoSeq(level);

    // Determine Which Button Is Clicked

    console.log("Auto =" + autoSeqLog); //log

        for (let i = 0; i < autoSeqLog.length; i++){

            setTimeout(function(){playSound(autoSeqLog[i]);},timeDelay*i);

        }
}

$(".btn").on("click",function () {
    var colorInp = $(this).attr("id");
    playSound(colorInp);
    userInp.push(colorInp);
    gameOn = checkUser();

    if (gameOn == "Fail" || (userInp.slice(-1) != autoSeqLog[userInp.length-1])) {
            playSound("wrong");
            $("h1").html("Game Over! Press S to Restart.");
            userInp = [];
            autoSeqLog = [];
            level=1;

        } else if (gameOn == "Pass") {
            $("h1").html("Level " + (level-1) +" Passed!");
            userInp = [];
            setTimeout(function(){
                $("h1").html("Level "+level);
                playGame();}
                ,timeDelay+500);
        }
})

function checkUser () {
    console.log("User ="+userInp); //log

    if (userInp.length == autoSeqLog.length){
        for (let i = 0;i<userInp.length;i++) {
        
            if (userInp[i] !== autoSeqLog[i]) {
                return "Fail";
            } else if (userInp[i] == autoSeqLog[i] && i==userInp.length-1){
                level++;
                return "Pass"
            }

        }
    } else if (userInp.length > autoSeqLog.length) {
        return "Fail"
    } 

}






