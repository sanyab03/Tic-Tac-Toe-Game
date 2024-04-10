document.addEventListener('click', function () { document.getElementById('music').play();}, { once: true });
const mainbox = document.querySelector(".mainbox"),
    buttonX = mainbox.querySelector(".options .playerX"),
    buttonO = mainbox.querySelector(".options .playerO"),
    playBoard = document.querySelector(".play-board"),
    players = document.querySelector(".players"),
    allBox = document.querySelectorAll("section span"),

    resultBox = document.querySelector(".result-box"),
    wonText = resultBox.querySelector(".won-text"),
    replay = resultBox.querySelector("button");

window.onload = () => {
    
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
}

buttonX.onclick = () => {
    mainbox.classList.add("hide");
    playBoard.classList.add("show");
}

buttonO.onclick = () => {
    mainbox.classList.add("hide");
    playBoard.classList.add("show");
    players.setAttribute("class", "players active player");
}

let playerXIcon = '<i class="fas fa-times" style="color: #301934;"></i>';
let playerOIcon = '<i class="far fa-circle" style="color:#AA336A;"></i>';
let playerSign = "X", game_run = true;

function clickedBox(element) {
  
    if (players.classList.contains("player")) {
        playerSign = "O";
        element.innerHTML = playerOIcon;
        players.classList.remove("active");
        element.setAttribute("id", playerSign);
    }
    else {
        element.innerHTML = playerXIcon;
        element.setAttribute("id", playerSign);
        players.classList.add("active");
    }
    selectWinner();
    element.style.pointerEvents = "none";
    playBoard.style.pointerEvents = "none";

    let randomTimeDelay = ((Math.random() * 1000) + 200).toFixed();
    setTimeout(() => {
        bot(game_run);
    }, randomTimeDelay);
}

function bot() {
    let array = [];
    if (game_run) {
        playerSign = "O";
     
        for (let i = 0; i < allBox.length; i++) {
            if (allBox[i].childElementCount == 0) {
                array.push(i);
            }
        }
       
        let randomBox = array[Math.floor(Math.random() * array.length)];
        if (array.length > 0) {
            if (players.classList.contains("player")) {
                playerSign = "X";
                allBox[randomBox].innerHTML = playerXIcon;
                allBox[randomBox].setAttribute("id", playerSign);
                players.classList.add("active");
            }
            else {
                allBox[randomBox].innerHTML = playerOIcon;
                players.classList.remove("active");
                allBox[randomBox].setAttribute("id", playerSign);
            }
            selectWinner();
        }
        allBox[randomBox].style.pointerEvents = "none";
        playBoard.style.pointerEvents = "auto";
        playerSign = "X";
    }
}

function idvalue(classname) {
    return document.querySelector(".box" + classname).id;
}

function checkIdSign(val1, val2, val3, sign) {
    if (idvalue(val1) == sign && idvalue(val2) == sign && idvalue(val3) == sign) {
        return true;
    }
    return false;
}

function selectWinner() {
    if (checkIdSign(1, 2, 3, playerSign) || checkIdSign(4, 5, 6, playerSign) || checkIdSign(7, 8, 9, playerSign) || checkIdSign(1, 4, 7, playerSign) || checkIdSign(2, 5, 8, playerSign) || checkIdSign(3, 6, 9, playerSign) || checkIdSign(1, 5, 9, playerSign) || checkIdSign(3, 5, 7, playerSign)) {
        game_run = false;
        bot(game_run);
        setTimeout(() => {
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
        }, 700);
        wonText.innerHTML = `Player ${playerSign}<br> won the game!`;
    }
    else {
        if (idvalue(1) != "" && idvalue(2) != "" && idvalue(3) != "" && idvalue(4) != "" && idvalue(5) != "" && idvalue(6) != "" && idvalue(7) != "" && idvalue(8) != "" && idvalue(9) != "") {
            game_run = false;
            bot(game_run);
            setTimeout(() => {
                resultBox.classList.add("show");
                playBoard.classList.remove("show");
            }, 700);
            wonText.textContent = "Match has been drawn!";
        }
    }
}

replay.onclick = () => {
    window.location.reload();
}

