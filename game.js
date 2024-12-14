//Initialized variables
let is_game_running = false; 
let score = 0;

//Declared variables
let end;
let start;
let boundaries;
let status_display; 

document.addEventListener("DOMContentLoaded", loadPage);

class Range{
    constructor(sw, ew, sh, eh){
        this._sw = sw
        this._ew = ew
        this._sh = sh
        this._eh = eh
    }

    get w(){
        return Math.random() * (this._ew - this._sw) + this._sw;
    }

    get h(){
        return Math.random() * (this._eh - this._sh) + this._sh;
    }
}

let palying_ranges = [new Range(152, 321, 52, 72), new Range(42, 172, 202, 223), 
    new Range(300, 430, 202, 223), new Range(152, 172, 101, 174)]  
function resetGame(){
    console.log("reset");
    score = 0;
    displayScore("");
    for(let i = 0; i < boundaries.length; i++)
        boundaries[i].style.backgroundColor = "#eeeeee";
    is_game_running = false;
}
    function gameOverP(){
    console.log("Game Over out of range");
    gameOver();
}
function collectKey(){
    if(is_game_running){
        score+=2;
        displayScore("");
        let key_sound = new Audio("./k.wav");
        key_sound.play();
        document.getElementById("key").style.top = 0 + "px";
        document.getElementById("key").style.left = 0 + "px";
    }
}

function addKey(){
    let index = Math.floor(Math.random() * 4);
    let w = palying_ranges[index].w;
    let h = palying_ranges[index].h;
    let key = document.getElementById("key");
    key.style.left = w + "px";
    key.style.top = h + "px";
    key.addEventListener("mouseover", collectKey);
}

function setTimer(time){
    document.getElementById("timer").innerHTML = "Timer: " + time;
    let timer = setInterval(function(){
        if(time > 0){
            time--;
            document.getElementById("timer").innerHTML = "Timer: " + time;
        }
        if(time == 0){
            clearInterval(timer);
            gameOver()
        }
        if(!is_game_running){
            clearInterval(timer);
        }
    }, 1000);
}

function displayScore(message){
    if(message != "")
        status_display.innerHTML = message + "<br/>" + "Your Score is: " + score;
    else
        status_display.innerHTML = "<br/>" + "Your Score is: " + score;
}

function gameOver(time){
    if(is_game_running){
        for(let i = 0; i < boundaries.length; i++)
            boundaries[i].style.backgroundColor = "rgb(243, 159, 159)"; 
        if(score > 0){
            score = score - 1;
            displayScore("Game Over!");
        }
        if(time == 0 && score > 0){
            score = score - 1;
            displayScore("Time's up!");
        }
        is_game_running = false;
        let lose_sound = new Audio("./lose.wav");
        lose_sound.play();
        start.addEventListener("click", startGame);
    }
}

function startGame(){
    
    let game = document.getElementById("game");
    game.addEventListener("mouseleave", gameOverP);
    
    addKey();


    displayScore("");
    setTimer(5);

    is_game_running = true;
    if (is_game_running) {
        start.removeEventListener("click", startGame);
    }

    for(let i = 0; i < boundaries.length; i++)
        boundaries[i].style.backgroundColor = "#eeeeee"; 
}

function endGame(){
    document.getElementById("game").removeEventListener("mouseleave", gameOverP);
    if(is_game_running){
        for(let i = 0; i < boundaries.length; i++)
            boundaries[i].style.backgroundColor = "rgb(113 225 141)"; 
        score = score + 5;
        let win_sound = new Audio("./win.wav");
        win_sound.play();
        displayScore("You Won!");
        is_game_running = false;
        start.addEventListener("click", startGame);
    }
}

function loadPage(){
    end = document.getElementById("end");
    start = document.getElementById("start");
    boundaries = document.getElementsByClassName("boundary");
    status_display =  document.getElementById("status");
    

    const reset = document.getElementById("resetGame");
    reset.addEventListener("click", resetGame);

    document.getElementById("timer").innerHTML = "Timer: ";

    end.addEventListener("mouseover", endGame);
    start.addEventListener("click", startGame);

    for(let i = 0; i < boundaries.length; i++){
        boundaries[i].addEventListener("mouseover", gameOver);
    }
}


