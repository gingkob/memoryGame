const cards = document.querySelectorAll(".memory-card");

let play1 = 'Igrac 1';
let play2 = 'Igrac 2';
let play3 = 'Igrac 3';
let play4 = 'Igrac 4';
let scorePlay1 = 0, scorePlay2 = 0, scorePlay3 = 0, scorePlay4 = 0 ;
let score1 = document.querySelector("#score1");
let score2 = document.querySelector("#score2");
let score3 = document.querySelector("#score3");
let score4 = document.querySelector("#score4");
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let currentOnMove = ["player1", "player2", "player3", "player4"]
let onMove = currentOnMove[0];


let player1 = value => play1 = value;
let player2 = value => play2 = value;
let player3 = value => play3 = value;
let player4 = value => play4 = value;

function flipCard(){
  if (lockBoard) return;
  if (this === firstCard) return;
this.classList.add("flip")
// this.querySelector(".front-face").classList.add("corner-ribbon", "top-right", "sticky", "blue")
// firstOnMove ? this.querySelector(".front-face").classList.add("firstcolor") : this.querySelector(".front-face").classList.add("secondcolor");
  if(!hasFlippedCard && !lockBoard){
    hasFlippedCard = !hasFlippedCard;
    firstCard = this;
    console.log(firstCard);
    
    return;
  }
  secondCard = this;  
  matchCheck(firstCard.dataset.name,secondCard.dataset.name) 
}

matchCheck = (a, b) => (a === b) ? disableCards() : unFlipCards();

disableCards = () => {
 /*  if (firstOnMove) {
    firstCard.insertAdjacentHTML('beforeend','<img class="left-corner"/>');
    secondCard.insertAdjacentHTML('beforeend','<img class="left-corner"/>');
  } else {
    firstCard.insertAdjacentHTML('beforeend','<img class="right-corner"/>');
    secondCard.insertAdjacentHTML('beforeend','<img class="right-corner"/>');
  }  */

  switch(onMove){

    case "player1": 
      firstCard.insertAdjacentHTML('beforeend','<img class="player1-corner"/>');
      secondCard.insertAdjacentHTML('beforeend','<img class="player1-corner"/>');
      score1.textContent = ++scorePlay1;
      break; 
    case "player2":
      firstCard.insertAdjacentHTML('beforeend','<img class="player2-corner"/>');
      secondCard.insertAdjacentHTML('beforeend','<img class="player2-corner"/>');
      score2.textContent = ++scorePlay2;
      break;
    case "player3":
      firstCard.insertAdjacentHTML('beforeend','<img class="player3-corner"/>');
      secondCard.insertAdjacentHTML('beforeend','<img class="player3-corner"/>');
      score3.textContent = ++scorePlay3;
      break; 
    case "player4":
      firstCard.insertAdjacentHTML('beforeend','<img class="player4-corner"/>');
      secondCard.insertAdjacentHTML('beforeend','<img class="player4-corner"/>');
      score4.textContent = ++scorePlay4;
      break;
    
    default: alert("Something went wrong!");
 } 
 console.log("novi", firstCard)
 console.log("novi2", secondCard)
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();

  // firstOnMove ? score1.textContent = ++scorePlay1 : score2.textContent = ++scorePlay2;

}

unFlipCards = () => {

  // [firstOnMove, lockBoard] = [!firstOnMove, true];
   let previous = currentOnMove.shift();
   currentOnMove.push(previous);
   onMove = currentOnMove[0];
   console.log("onMove", onMove)
   lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip")
    secondCard.classList.remove("flip")
    resetBoard();
  }, 750);  
}

resetBoard = () => {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(shuffle = () => cards.forEach(card => card.style.order =  Math.floor(Math.random()*12)))()

cards.forEach(card => card.addEventListener("click", flipCard));
