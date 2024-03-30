let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX , playerO

const WinPatterns = [
  [0,1,2],
  [0,3,6],
  [0,4,8],
  [1,4,7],
  [2,5,8],
  [2,4,6],
  [3,4,5],
  [6,7,8],

];

const resetGame = () => {
  turnO =true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box)=>{
  box.addEventListener("click",()=>{
    if(turnO) {
      //playerO
      box.innerText = "O";
      box.classList.add("O");
      turnO =false;
      

    }else {
      //playerX
      box.innerText = "X";
      box.classList.add("X");
      turnO =true;
    }
    box.disabled = true;

    checkWinner();
     
  });

});

const disableBoxes =() => {
  for(let box of boxes){
    box.disabled = true;
  }   
};
const enableBoxes =() => {
  for(let box of boxes){
    box.disabled = false;
    box.innerText = "";
box.classList.remove("O", "X");
  } 
};
const showWinner =(winner) => {
  msg.innerText=`Congratulations, Winner is ${winner} !!`;
;
  msgContainer.classList.remove("hide");
  disableBoxes();
};
const showDraw = () =>{
  msg.innerText ="It's a draw!";
  msgContainer.classList.remove("hide");
  disableBoxes();
};
const checkWinner =() => {
  let draw = true;

  for (let pattern of WinPatterns){
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;
    
    if(pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val){
        showWinner(pos1Val);
        return;
      }
    }
    for(let box of boxes){
      if(box.innerText === ""){
        draw = false;
        break;
      }
    }
    if(draw){
      showDraw();
    }
  };

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);
