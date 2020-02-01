const cards = document.querySelectorAll(".memory-card");
const playerBoard = document.getElementById("player-board");
const playerBoardContainer = document.getElementById("player-board-container");
let memoryGameHtml = document.getElementById("memory-game-html");
let memoryGameHtmlChild = document.getElementById("memory-game-html-child")
let introGameSection = document.getElementById("intro-section")
let introGameSectionChild = document.getElementById("intro-section-child")
let dice1 = document.getElementById("dice1")

// -------------------start intro section------------------
let names = {};
let memoryCall = () => { 
  names = [
    { id: "player1",
      name: document.getElementById("player1").value.trim(),
      dice: document.getElementById("dice1").value.trim()
    },
    { id: "player2",
      name: document.getElementById("player2").value.trim(),
      dice: document.getElementById("dice2").value.trim()
    },
    {  id: "player3", 
      name: document.getElementById("player3").value.trim(),
      dice: document.getElementById("dice3").value.trim()
    },
    { id: "player4", 
      name: document.getElementById("player4").value.trim(),
      dice: document.getElementById("dice4").value.trim()
    }
  ]

  let validator = 0;
  let pairValidation = true;


  names.forEach( item => {
    if(item.name){
        validator++;
      if(!item.dice){
        pairValidation = false;
      }
    }    
  })

  if(validator > 1){
    if(pairValidation){
      introGameSection.classList.add("show-nothing")
      introGameSectionChild.remove();
      memoryGameHtml.append(memoryGameHtmlChild);
      memoryGameHtml.classList.remove("show-nothing");
      startMemory(names);
    }else{
      alert("Svaki uneti igrac mora baciti i kockicu")
    }    
  }else{
    alert("Potrebno je bar 2 igraca za igru memorije")
  }

}
let climbingToTheMountainCall = () => alert("mountain");

let rollDice = (dice) => {
  switch (dice){
    case "dice1":
      if(document.getElementById("player1").value.trim() != ""){
        dice1.classList.remove("index__player__dice");
        dice1.classList.add("index__player__dice__rolled", "index__inputs__bordered");
        dice1.textContent = Math.floor(Math.random()*6+1);
        dice1.setAttribute("disabled", true);
        dice1.setAttribute("value", dice1.textContent);
        document.getElementById("player1").setAttribute("disabled", true);
        document.getElementById("player1").classList.add("index__inputs__bordered");
      }else{
        alert("input name");
        return;
      }      
      break;    
    case "dice2":
      if(document.getElementById("player2").value.trim() != ""){
        dice2.classList.remove("index__player__dice")
        dice2.classList.add("index__player__dice__rolled", "index__inputs__bordered")
        dice2.textContent = Math.floor(Math.random()*6+1);
        dice2.setAttribute("disabled", true);
        dice2.setAttribute("value", dice2.textContent);
        document.getElementById("player2").setAttribute("disabled", true);
        document.getElementById("player2").classList.add("index__inputs__bordered");
      }else{
        alert("input name");
        return;
      }      
      break;
    case "dice3":
      if(document.getElementById("player3").value.trim() != ""){
        dice3.classList.remove("index__player__dice")
        dice3.classList.add("index__player__dice__rolled", "index__inputs__bordered")
        dice3.textContent = Math.floor(Math.random()*6+1);
        dice3.setAttribute("disabled", true);
        dice3.setAttribute("value", dice3.textContent);
        document.getElementById("player3").setAttribute("disabled", true);
        document.getElementById("player3").classList.add("index__inputs__bordered");
      }else{
        alert("input name");
        return;
      }      
      break;
    case "dice4":
      if(document.getElementById("player4").value.trim() != ""){
        dice4.classList.remove("index__player__dice")
        dice4.classList.add("index__player__dice__rolled", "index__inputs__bordered")
        dice4.textContent = Math.floor(Math.random()*6+1);
        dice4.setAttribute("disabled", true);
        dice4.setAttribute("value", dice4.textContent);
        document.getElementById("player4").setAttribute("disabled", true);
        document.getElementById("player4").classList.add("index__inputs__bordered");
      }else{
        alert("input name");
        return;
      }      
      break;
    default:
      break;
  }
};

// --------------------end intro section-----------------

// --------------------start of memory section board----------------
let score1, score2, score3, score4, hasFlippedCard, firstCard, secondCard, lockBoard, currentOnMove, player1Container, player2Container, player3Container, player4Container;

let startMemory = names => { 

  let playInfoArr = []
  names.forEach(item => playInfoArr.push({"player":item.name, "score":0, id:item.id}))
console.log("play info: ", playInfoArr)
  let playerActive = 0, playerPassive = 3, overAllScore = 0;

  score1 = document.getElementById("score1");
  score2 = document.getElementById("score2");
  score3 = document.getElementById("score3");
  score4 = document.getElementById("score4");
  hasFlippedCard = false;
  lockBoard = false;
  currentOnMove = [];

  player1Container = document.getElementById("player1-container");
  player2Container = document.getElementById("player2-container");
  player3Container = document.getElementById("player3-container");
  player4Container = document.getElementById("player4-container");

  let player1 = document.getElementById("player1");
  let player2 = document.getElementById("player2");
  let player3 = document.getElementById("player3");
  let player4 = document.getElementById("player4");

  (() => {
    if (playInfoArr[0].player.trim() != "") {
//      currentOnMove.push("player1");
      player1Container.style.order = playerActive++;
    } else {
    //  currentOnMove.push("");
      player1Container.style.order = playerPassive--;
      player1Container.classList.add("show-nothing")
    }

    if (playInfoArr[1].player.trim() != "") {
   //   currentOnMove.push("player2");
      player2Container.style.order = playerActive++;
    } else {
    //  currentOnMove.push("");
      player2Container.style.order = playerPassive--;
      player2Container.classList.add("show-nothing")
    }

    if (playInfoArr[2].player.trim() != "") {
   //   currentOnMove.push("player3");
      player3Container.style.order = playerActive++;
    } else {
     // currentOnMove.push("");
      player3Container.style.order = playerPassive--;
      player3Container.classList.add("show-nothing")
    }

    if (playInfoArr[3].player.trim() != "") {
   //   currentOnMove.push("player4");
      player4Container.style.order = playerActive++;
    } else {
     // currentOnMove.push("");
      player4Container.style.order = playerPassive--;
      player4Container.classList.add("show-nothing")
    }
  })()
/*   let playerContainerSetupAdd = (player) =>{
    currentOnMove.push(player);
      switch(player){
        case "player1":
          player1Container.style.order = playerActive++;
          break;
        case "player2":
          player2Container.style.order = playerActive++;
          break;
        case "player3":
          player3Container.style.order = playerActive++;
          break;
        case "player4":
          player4Container.style.order = playerActive++;
          break;
      }      
  }

  let playerContainerSetupSubstract = (player) =>{
      switch(player){
        case "player1":
          player1Container.style.order = playerPassive--;
          player1Container.classList.add("show-nothing");
          break;
        case "player2":
          player1Container.style.order = playerPassive--;
          player1Container.classList.add("show-nothing");
          break;
        case "player3":
          player1Container.style.order = playerPassive--;
          player1Container.classList.add("show-nothing");
          break;
        case "player4":
          player1Container.style.order = playerPassive--;
          player1Container.classList.add("show-nothing");
          break;
      }      
  }

  (() => {
    playInfoArr.forEach(item =>{
      if (item.player.trim() != "") {
        playerContainerSetupAdd(item.id)
      } else {
        playerContainerSetupSubstract(item.id)
      }
    })
  })() */
  
  names.sort((a,b) =>b.dice - a.dice);
  names.forEach(item => {
    if(item.name != ""){
      currentOnMove.push(item.id)
    }    
  })

  console.log("on move: ", currentOnMove);

  player1.textContent = playInfoArr[0].player;
  player2.textContent = playInfoArr[1].player;
  player3.textContent = playInfoArr[2].player;
  player4.textContent = playInfoArr[3].player;

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
        firstCard.insertAdjacentHTML('beforeend', '<img class="player1-corner remove-tag"/>');
        secondCard.insertAdjacentHTML('beforeend', '<img class="player1-corner remove-tag"/>');
        score1.textContent = ++playInfoArr[0].score;
        break;
      case "player2":
        firstCard.insertAdjacentHTML('beforeend', '<img class="player2-corner remove-tag"/>');
        secondCard.insertAdjacentHTML('beforeend', '<img class="player2-corner remove-tag"/>');
        score2.textContent = ++playInfoArr[1].score;
        break;
      case "player3":
        firstCard.insertAdjacentHTML('beforeend', '<img class="player3-corner remove-tag"/>');
        secondCard.insertAdjacentHTML('beforeend', '<img class="player3-corner remove-tag"/>');
        score3.textContent = ++playInfoArr[2].score;
        break;
      case "player4":
        firstCard.insertAdjacentHTML('beforeend', '<img class="player4-corner remove-tag"/>');
        secondCard.insertAdjacentHTML('beforeend', '<img class="player4-corner remove-tag"/>');
        score4.textContent = ++playInfoArr[3].score;
        break;

      default: alert("Something went wrong!");
    }

    overAllScore++;
    if (overAllScore == 12) {
      let maxScore = Math.max(...playInfoArr.map(o => o.score), 0);
      let winners = playInfoArr.filter(item => item.score == maxScore)
      console.log(winners)
      setTimeout(() => {
        if (winners.length == 1){
          alert("kraj\nPobednik je: " + winners[0].player);
        } else {
          let winnersMulti = "";
          winners.forEach(item => winnersMulti += item.player + ", ")
          alert("kraj\nPobednici su: " + winnersMulti.trim().slice(0,-1));
        }
        
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
    }, 1200);
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
 changeCurrentOnMoveIndicator( null, currentOnMove[0]);

  (shuffle = () => cards.forEach(card => card.style.order = Math.floor(Math.random() * 12)))()

  cards.forEach(card => card.addEventListener("click", flipCard));

  
}

function newGame(id) {
  score1.textContent = 0;
  score2.textContent = 0;
  score3.textContent = 0;
  score4.textContent = 0;
  player1Container.classList.remove('player1-border')
  player2Container.classList.remove('player2-border')
  player3Container.classList.remove('player3-border')
  player4Container.classList.remove('player4-border')
  cards.forEach(card => {
    card.classList.remove("flip");
    let el = card.querySelector(".remove-tag");
    if(el){
      card.removeChild(el);
    }
})
  setTimeout(()=>startMemory(names),500);
}
function chooseGame(id) {
    alert('choose game')
}
// --------------------end of memory section board---------------------

//(() => memoryGameHtmlChild.remove())()
