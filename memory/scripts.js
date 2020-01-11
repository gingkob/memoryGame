const cards = document.querySelectorAll(".memory-card");

let play1 = 'Igrac 1';
let play2 = 'Igrac 2';
let scorePlay1 = 0, scorePlay2 = 0;
let score1 = document.querySelector("#score1");

let score2 = document.querySelector("#score2");
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let firstOnMove = true;

let player1 = value => play1 = value;
let player2 = value => play2 = value;

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
  if (firstOnMove) {
    firstCard.insertAdjacentHTML('beforeend','<img class="left-corner"/>');
    secondCard.insertAdjacentHTML('beforeend','<img class="left-corner"/>');
  } else {
    firstCard.insertAdjacentHTML('beforeend','<img class="right-corner"/>');
    secondCard.insertAdjacentHTML('beforeend','<img class="right-corner"/>');
  } 

  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
  firstOnMove ? score1.innerHTML = ++scorePlay1 : score2.innerHTML = ++scorePlay2;
}

unFlipCards = () => {
  [firstOnMove, lockBoard] = [!firstOnMove, true];
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
