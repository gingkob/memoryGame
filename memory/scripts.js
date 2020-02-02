const cards = document.querySelectorAll(".memory-card");
const playerBoard = document.getElementById("player-board");
const playerBoardContainer = document.getElementById("player-board-container");
let memoryGameHtml = document.getElementById("memory-game-html");
let memoryGameHtmlChild = document.getElementById("memory-game-html-child")
let introGameSection = document.getElementById("intro-section")
let introGameSectionChild = document.getElementById("intro-section-child")

// -------------------start intro section------------------
let names = {};
let memoryCall = () => { 
  names = {
    play1: document.getElementById("player1").value.trim(),
    play2: document.getElementById("player2").value.trim(),
    play3: document.getElementById("player3").value.trim(),
    play4: document.getElementById("player4").value.trim()
  }

  let validator = 0;
  for(let x in names){
    if(!names[x]){
      validator++
    }
  }

  if(validator <= 2){
    // window.open("./memory/memory.html")
    introGameSection.classList.add("show-nothing")
    introGameSectionChild.remove();
    memoryGameHtml.append(memoryGameHtmlChild);
    memoryGameHtml.classList.remove("show-nothing");
    startMemory(names);
  }else{
    alert("Potrebno je bar 2 igraca za igru memorije")
  }

}
let climbingToTheMountainCall = () => alert("mountain");

// --------------------end intro section-----------------

// --------------------start of memory section board----------------

let startMemory = names => {

  let { play1, play2, play3, play4 } = names;

  let scorePlay1 = 0, scorePlay2 = 0, scorePlay3 = 0, scorePlay4 = 0, overAllScore = 0;
  let playerActive = 0, playerPassive = 3;

  let score1 = document.getElementById("score1");
  let score2 = document.getElementById("score2");
  let score3 = document.getElementById("score3");
  let score4 = document.getElementById("score4");
  let hasFlippedCard = false;
  let firstCard, secondCard;
  let lockBoard = false;
  // let currentOnMove = ["player1", "player2", "player3", "player4"]
  let currentOnMove = [];

  let player1Container = document.getElementById("player1-container");
  let player2Container = document.getElementById("player2-container");
  let player3Container = document.getElementById("player3-container");
  let player4Container = document.getElementById("player4-container");

  let player1 = document.getElementById("player1");
  let player2 = document.getElementById("player2");
  let player3 = document.getElementById("player3");
  let player4 = document.getElementById("player4");

  (() => {
    if (play1.trim() != "") {
      currentOnMove.push("player1");
      player1Container.style.order = playerActive++;
    } else {
      player1Container.style.order = playerPassive--;
    }

    if (play2.trim() != "") {
      currentOnMove.push("player2");
      player2Container.style.order = playerActive++;
    } else {
      player2Container.style.order = playerPassive--;
    }

    if (play3.trim() != "") {
      currentOnMove.push("player3");
      player3Container.style.order = playerActive++;
    } else {
      player3Container.style.order = playerPassive--;
    }

    if (play4.trim() != "") {
      currentOnMove.push("player4");
      player4Container.style.order = playerActive++;
    } else {
      player4Container.style.order = playerPassive--;
    }
  })()

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

  // matchCheck = (a, b) => (a === b) ? disableCards() : unFlipCards();
  matchCheck = (a, b) => true ? disableCards() : unFlipCards();

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
      let prvi = [];
      prvi.push(scorePlay1);
      prvi.push(scorePlay2);
      prvi.push(scorePlay3);
      prvi.push(scorePlay4);
      prvi.sort((a, b) => b - a);
      console.log(prvi)
      setTimeout(() => {
        alert("kraj\nPobednik je: ", prvi[0]);
        changeCurrentOnMoveIndicator(onMove);
        playerBoard.remove();
        playerBoardContainer.append(playerBoard);
      }, 1000);
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
      case "player1": player1Container.classList.remove("player1-border", "next-player-onMove-up");
        player1Container.classList.add("previous-player-onMove-down");
        break;
      case "player2": player2Container.classList.remove("player2-border", "next-player-onMove-up");
        player2Container.classList.add("previous-player-onMove-down");
        break;
      case "player3": player3Container.classList.remove("player3-border", "next-player-onMove-up");
        player3Container.classList.add("previous-player-onMove-down");
        break;
      case "player4": player4Container.classList.remove("player4-border", "next-player-onMove-up");
        player4Container.classList.add("previous-player-onMove-down");
        break;
      default: break;
    }

    switch (next) {
      case "player1": player1Container.classList.remove("previous-player-onMove-down");
        player1Container.classList.add("player1-border", "next-player-onMove-up");
        break;
      case "player2": player2Container.classList.remove("previous-player-onMove-down");
        player2Container.classList.add("player2-border", "next-player-onMove-up");
        break;
      case "player3": player3Container.classList.remove("previous-player-onMove-down");
        player3Container.classList.add("player3-border", "next-player-onMove-up");
        break;
      case "player4": player4Container.classList.remove("previous-player-onMove-down");
        player4Container.classList.add("player4-border", "next-player-onMove-up");
        break;
      default: break;
    }
  }

  (shuffle = () => cards.forEach(card => card.style.order = Math.floor(Math.random() * 12)))()

  cards.forEach(card => card.addEventListener("click", flipCard));
}

// --------------------end of memory section board---------------------

(() => memoryGameHtmlChild.remove())()
