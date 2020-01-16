const cards = document.querySelectorAll(".memory-card");

const [play1, play2, play3, play4] = ["mika", "", "jana", ""];
let scorePlay1 = 0, scorePlay2 = 0, scorePlay3 = 0, scorePlay4 = 0, overAllScore = 0;
let score1 = document.querySelector("#score1");
let score2 = document.querySelector("#score2");
let score3 = document.querySelector("#score3");
let score4 = document.querySelector("#score4");
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
// let currentOnMove = ["player1", "player2", "player3", "player4"]
let currentOnMove = [];

let player1Container = document.querySelector("#player1-container");
let player2Container = document.querySelector("#player2-container");
let player3Container = document.querySelector("#player3-container");
let player4Container = document.querySelector("#player4-container");

let player1 = document.querySelector("#player1");
if (play1.trim() != "") { currentOnMove.push("player1"); }
let player2 = document.querySelector("#player2");
if (play2.trim() != "") { currentOnMove.push("player2"); }
let player3 = document.querySelector("#player3");
if (play3.trim() != "") { currentOnMove.push("player3"); }
let player4 = document.querySelector("#player4");
if (play4.trim() != "") { currentOnMove.push("player4"); }
player1.textContent = play1;
player2.textContent = play2;
player3.textContent = play3;
player4.textContent = play4;

let onMove = currentOnMove[0];

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("flip")
  // this.querySelector(".front-face").classList.add("corner-ribbon", "top-right", "sticky", "blue")
  // firstOnMove ? this.querySelector(".front-face").classList.add("firstcolor") : this.querySelector(".front-face").classList.add("secondcolor");
  if (!hasFlippedCard && !lockBoard) {
    hasFlippedCard = !hasFlippedCard;
    firstCard = this;
    console.log(firstCard);

    return;
  }
  secondCard = this;
  matchCheck(firstCard.dataset.name, secondCard.dataset.name)
}

matchCheck = (a, b) => (a === b) ? disableCards() : unFlipCards();

disableCards = () => {

  switch (onMove) {

    case "player1":
      firstCard.insertAdjacentHTML('beforeend', '<img class="player1-corner"/>');
      secondCard.insertAdjacentHTML('beforeend', '<img class="player1-corner"/>');
      score1.textContent = ++scorePlay1;
      break;
    case "player2":
      firstCard.insertAdjacentHTML('beforeend', '<img class="player2-corner"/>');
      secondCard.insertAdjacentHTML('beforeend', '<img class="player2-corner"/>');
      score2.textContent = ++scorePlay2;
      break;
    case "player3":
      firstCard.insertAdjacentHTML('beforeend', '<img class="player3-corner"/>');
      secondCard.insertAdjacentHTML('beforeend', '<img class="player3-corner"/>');
      score3.textContent = ++scorePlay3;
      break;
    case "player4":
      firstCard.insertAdjacentHTML('beforeend', '<img class="player4-corner"/>');
      secondCard.insertAdjacentHTML('beforeend', '<img class="player4-corner"/>');
      score4.textContent = ++scorePlay4;
      break;

    default: alert("Something went wrong!");
  }

  overAllScore++;
  if (overAllScore == 12) {
    setTimeout(() =>{
      alert("kraj");
      changeCurrentOnMoveIndicator(onMove);
    },1000);
  }


  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();

  // firstOnMove ? score1.textContent = ++scorePlay1 : score2.textContent = ++scorePlay2;

}

unFlipCards = () => {
  let previous = currentOnMove.shift();
  currentOnMove.push(previous);
  onMove = currentOnMove[0];
  console.log("previous", previous)
  console.log("onMove", onMove)
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip")
    secondCard.classList.remove("flip")
    resetBoard();
    changeCurrentOnMoveIndicator(previous, onMove);
  }, 750);
}

resetBoard = () => {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

changeCurrentOnMoveIndicator = (previous, next) => {

  switch (previous) {
    case "player1": player1Container.classList.remove("player1-border");
      break;
    case "player2": player2Container.classList.remove("player2-border");
      break;
    case "player3": player3Container.classList.remove("player3-border");
      break;
    case "player4": player4Container.classList.remove("player4-border");
      break;
    default: break;
  }

  switch (next) {
    case "player1": player1Container.classList.add("player1-border");
      break;
    case "player2": player2Container.classList.add("player2-border");
      break;
    case "player3": player3Container.classList.add("player3-border");
      break;
    case "player4": player4Container.classList.add("player4-border");
      break;
    default: break;
  }
}

(shuffle = () => cards.forEach(card => card.style.order = Math.floor(Math.random() * 12)))()

cards.forEach(card => card.addEventListener("click", flipCard));
