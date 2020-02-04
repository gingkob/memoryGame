const cards = document.querySelectorAll(".memory-card");
const playerBoard = document.getElementById("player-board");
const playerBoardContainer = document.getElementById("player-board-container");
let memoryGameHtml = document.getElementById("memory-game-html");
let memoryGameHtmlChild = document.getElementById("memory-game-html-child")
let mountainGameHtml = document.getElementById("mountain-game-html");
let mountainGameHtmlChild = document.getElementById("mountain-game-html-child")
let introGameSection = document.getElementById("intro-section")
let introGameSectionChild = document.getElementById("intro-section-child");
let diceDIV = document.querySelector(".dice");
let dice1 = document.getElementById("dice1")
let namesCopyArr = []

function customAlert(text) {
  let modal = document.querySelector('.alert');
  let overlay = document.querySelector('.modal-overlay');
  let paragraph = document.querySelector('.custom-alert-text');
  paragraph.textContent = text
  modal.classList.remove('startClosed')
  modal.classList.toggle('closed');
  overlay.classList.remove('startClosed')
  overlay.classList.toggle('closedOverlay')
}

function customAlertManual(text) {
  let modal = document.querySelector('.alertManual');
  let overlay = document.querySelector('.modal-overlay');
  let paragraph = document.querySelector('.modal-contentManual');
  paragraph.innerHTML = text
  modal.classList.remove('startClosed')
  modal.classList.toggle('closed');
  overlay.classList.remove('startClosed')
  overlay.classList.toggle('closedOverlay')
}

function customAlertTime(text, time = 1500) {
  let modal = document.querySelector('.alert');
  let overlay = document.querySelector('.modal-overlay');
  let button = document.querySelector('.custom-alert-button').style.display = 'none';
  let closeX = document.querySelector('.close-button').style.display = 'none';
  let paragraph = document.querySelector('.custom-alert-text');
  paragraph.textContent = text
  modal.classList.toggle('closed');
  overlay.classList.toggle('closedOverlay')
  setTimeout(() => {
    removeAlert()
  }, time)

}
function removeAlert() {
  let modal = document.querySelector('.alert');
  let overlay = document.querySelector('.modal-overlay');
  modal.classList.toggle('closed');
  overlay.classList.toggle('closedOverlay')
}
function removeAlertManual() {
  let modal = document.querySelector('.alertManual');
  let overlay = document.querySelector('.modal-overlay');
  modal.classList.toggle('closed');
  overlay.classList.toggle('closedOverlay')
}

const textManualMountain = (`<p>За многе планине везују се фантастичне приче о великом благу, које вековима заборављено лежи на неприступачним местима. У тим причама новац и злато најчешће су сакрили хајдуци или су га закопали богати трговци, кријући га од хорди пљачкаша. Децо, истинско благо свих планина \n није сакривено. Благо наше планине су њена природна богатства, њене шуме и реке, животиње и биљке, реке и језера, птице и стене...</p>
 <br/>
<p>Благо наше планине данас је у опасности!  У великој је опасности због тога што човек у својој жељи да покори силе природе уништава све пред собом. Сече шуме, преграђује реке, гради путеве и насеља тамо где је некада била нетакнута природа. Децо, истинско благо свих планина није сакривено али зато мора бити сачувано, зато</p>
<br/>
<p><strong>ИГРАЈ СЕ, ИСТРАЖИ, ОТКРИЈ И САЧУВАЈ
БЛАГО НАШЕ ПЛАНИНЕ!</strong></p>
<br/>
<p>Благо нaше планине је игра коју обично играју деца. Она уче кроз игру о важности очувања природних ресурса, правећи притом јасну разлику између поступака који воде ка уништењу природе и поступака који помажу очување животне средине. Пријатељско понашање води играча брже ка циљу. Лоши поступци воде играча назад, ка почетку игре.</p>
<br/>
<p><strong>Правила игре</strong></p>
<ol>
<li> Игру играју два до четири играча. Сваки играч једном баца коцку да би одредио свој редни број. Највећи бачени број први почиње игру.</li>
<li> Када играч дође на наградна поља плаве боје помера своју фигурицу напред на зелено поље са истим симболoм у складу са табелом.</li> 
<li> Када играч дође на казнена поља црне боје враћа се  на поља црвене боје са истим симболом, у складу са табелом.</li> 
<li> Победник је играч који први дође до поља 100 или 101. Играч мора да баца коцку све док не добије одговарајући број којим заузима победничко поље.</li>
<li> Ако у последњем кругу бацања и други играч добије одговарајући број и заузме једно од два победничка поља, игра се завршава нерешено.</li>
<li> Шестица добијена из бацања у току игре доноси играчу додатно бацање.</li>
<li> Ако у току игре играч после бацања заузме поље које је претходник већ заузео - предходник мора да се врати 12 поља у назад.</li></ol>`)

// -------------------start intro section------------------
let names = {};
let memoryCall = () => {
  names = [
    {
      id: "player1",
      name: document.getElementById("player1").value.trim(),
      dice: document.getElementById("dice1").value.trim()
    },
    {
      id: "player2",
      name: document.getElementById("player2").value.trim(),
      dice: document.getElementById("dice2").value.trim()
    },
    {
      id: "player3",
      name: document.getElementById("player3").value.trim(),
      dice: document.getElementById("dice3").value.trim()
    },
    {
      id: "player4",
      name: document.getElementById("player4").value.trim(),
      dice: document.getElementById("dice4").value.trim()
    }
  ]

  let validator = 0;
  let pairValidation = true;


  names.forEach(item => {
    if (item.name) {
      validator++;
      if (!item.dice) {
        pairValidation = false;
      }
    }
  })
  if (validator > 1) {
    if (pairValidation) {
      introGameSection.classList.add("show-nothing")
      introGameSectionChild.remove();
      memoryGameHtml.append(memoryGameHtmlChild);
      memoryGameHtml.classList.remove("show-nothing");
      startMemory(names);
    } else {
      customAlert("Сваки унети играч мора бацити и коцкицу - тако се одређује редослед играча у игри.")
    }
  } else {
    customAlert("За игру је потребно најмање два играча. Унесите њихова имена.")
  }

}
let climbingToTheMountainCall = () => {
  names = [
    {
      id: "player1",
      name: document.getElementById("player1").value.trim(),
      dice: document.getElementById("dice1").value.trim()
    },
    {
      id: "player2",
      name: document.getElementById("player2").value.trim(),
      dice: document.getElementById("dice2").value.trim()
    },
    {
      id: "player3",
      name: document.getElementById("player3").value.trim(),
      dice: document.getElementById("dice3").value.trim()
    },
    {
      id: "player4",
      name: document.getElementById("player4").value.trim(),
      dice: document.getElementById("dice4").value.trim()
    }
  ]

  let validator = 0;
  let pairValidation = true;


  names.forEach(item => {
    if (item.name) {
      validator++;
      if (!item.dice) {
        pairValidation = false;
      }
    }
  })

  if (validator > 1) {
    if (pairValidation) {
      introGameSection.classList.add("show-nothing")
      introGameSectionChild.remove();
      mountainGameHtml.append(mountainGameHtmlChild);
      mountainGameHtml.classList.remove("show-nothing");
      startMountain(names);
    } else {
      customAlert("Сваки унети играч мора бацити и коцкицу - тако се одређује редослед играча у игри :-)")
    }
  } else {
    customAlert("За игру је потребно најмање два играча. Унесите имена :-)")
  }

};

let rollDice = (dice) => {
  switch (dice) {
    case "dice1":
      if (document.getElementById("player1").value.trim() != "") {
        dice1.classList.remove("index__player__dice");
        dice1.classList.add("index__player__dice__rolled", "index__inputs__bordered");
        dice1.textContent = Math.floor(Math.random() * 6 + 1);
        dice1.setAttribute("disabled", true);
        dice1.setAttribute("value", dice1.textContent);
        document.getElementById("player1").setAttribute("disabled", true);
        document.getElementById("player1").classList.add("index__inputs__bordered");
      } else {
        customAlert("input name");
        return;
      }
      break;
    case "dice2":
      if (document.getElementById("player2").value.trim() != "") {
        dice2.classList.remove("index__player__dice")
        dice2.classList.add("index__player__dice__rolled", "index__inputs__bordered")
        dice2.textContent = Math.floor(Math.random() * 6 + 1);
        dice2.setAttribute("disabled", true);
        dice2.setAttribute("value", dice2.textContent);
        document.getElementById("player2").setAttribute("disabled", true);
        document.getElementById("player2").classList.add("index__inputs__bordered");
      } else {
        customAlert("input name");
        return;
      }
      break;
    case "dice3":
      if (document.getElementById("player3").value.trim() != "") {
        dice3.classList.remove("index__player__dice")
        dice3.classList.add("index__player__dice__rolled", "index__inputs__bordered")
        dice3.textContent = Math.floor(Math.random() * 6 + 1);
        dice3.setAttribute("disabled", true);
        dice3.setAttribute("value", dice3.textContent);
        document.getElementById("player3").setAttribute("disabled", true);
        document.getElementById("player3").classList.add("index__inputs__bordered");
      } else {
        customAlert("input name");
        return;
      }
      break;
    case "dice4":
      if (document.getElementById("player4").value.trim() != "") {
        dice4.classList.remove("index__player__dice")
        dice4.classList.add("index__player__dice__rolled", "index__inputs__bordered")
        dice4.textContent = Math.floor(Math.random() * 6 + 1);
        dice4.setAttribute("disabled", true);
        dice4.setAttribute("value", dice4.textContent);
        document.getElementById("player4").setAttribute("disabled", true);
        document.getElementById("player4").classList.add("index__inputs__bordered");
      } else {
        customAlert("input name");
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
  names.forEach(item => playInfoArr.push({ "player": item.name, "score": 0, id: item.id }))

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
      player1Container.classList.remove("show-nothing")
    } else {
      //  currentOnMove.push("");
      player1Container.style.order = playerPassive--;
      player1Container.classList.add("show-nothing")
    }

    if (playInfoArr[1].player.trim() != "") {
      //   currentOnMove.push("player2");
      player2Container.style.order = playerActive++;
      player2Container.classList.remove("show-nothing")
    } else {
      //  currentOnMove.push("");
      player2Container.style.order = playerPassive--;
      player2Container.classList.add("show-nothing")
    }

    if (playInfoArr[2].player.trim() != "") {
      //   currentOnMove.push("player3");
      player3Container.style.order = playerActive++;
      player3Container.classList.remove("show-nothing")
    } else {
      // currentOnMove.push("");
      player3Container.style.order = playerPassive--;
      player3Container.classList.add("show-nothing")
    }

    if (playInfoArr[3].player.trim() != "") {
      //   currentOnMove.push("player4");
      player4Container.style.order = playerActive++;
      player4Container.classList.remove("show-nothing")
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
  namesCopyArr = [...names];
  names.sort((a, b) => b.dice - a.dice);
  names.forEach(item => {
    if (item.name != "") {
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

      default: customAlert("Something went wrong!");
    }

    overAllScore++;
    if (overAllScore == 12) {
      let maxScore = Math.max(...playInfoArr.map(o => o.score), 0);
      let winners = playInfoArr.filter(item => item.score == maxScore)
      console.log(winners)
      setTimeout(() => {
        if (winners.length == 1) {
          customAlert("Игра је завршена.\n Победник је: \n" + winners[0].player);
        } else {
          let winnersMulti = "";
          winners.forEach(item => winnersMulti += item.player + ", ")
          customAlert("Игра је завршена.\n Победници су: \n" + winnersMulti.trim().slice(0, -1));
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

  let unFlipCards = () => {
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

  let resetBoard = () => {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  let changeCurrentOnMoveIndicator = (previous, next) => {

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
  changeCurrentOnMoveIndicator(null, currentOnMove[0]);

  (shuffle = () => cards.forEach(card => card.style.order = Math.floor(Math.random() * 12)))()

  cards.forEach(card => card.addEventListener("click", flipCard));


}

function showManual() {
  customAlertManual(textManualMountain)
}

function newGame(id) {
  if (id == "new-game") {
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
      if (el) {
        card.removeChild(el);
      }
    })
    setTimeout(() => startMemory(namesCopyArr), 500);
  } else {
    // player1Container.classList.remove('player-1-border')
    // player2Container.classList.remove('player-2-border')
    // player3Container.classList.remove('player-3-border')
    // player4Container.classList.remove('player-4-border')
    diceDIV.removeEventListener('click', rollDice);
    setTimeout(() => startMountain(namesCopyArr), 500);
  }
}
function chooseGame() {
 window.location.reload();
}
// --------------------end of memory section board---------------------



// -------------------mountain section starts her----------------------

function startMountain(names) {

  const canvas0 = document.getElementById("canvas0");
  const canvasCont = document.getElementById("canvasCont");
  const canvas1 = document.getElementById("canvas1");
  const canvasPlayer1 = document.getElementById("canvasPlayer1");
  const canvasPlayer2 = document.getElementById("canvasPlayer2");
  const canvasPlayer3 = document.getElementById("canvasPlayer3");
  const canvasPlayer4 = document.getElementById("canvasPlayer4");
  //const canvas4 = document.getElementById("canvas4");
  //const canvas5 = document.getElementById("canvas5"); // for rolling dice webgl

  let currentPossitionArr = [];
  let occupiedFields = [];
  let haveWinner = false;
  let turnFinished = false;
  let counter = 1;
  let okupator = "";



  const xOsa = [
    5200, 4975, 4743, 4511, 4294, 4046, 3788, 3564, 3338, 3118,
    2889, 2651, 2420, 2187, 1956, 1720, 1491, 1270, 970, 705,
    573, 519, 508, 505, 508, 505, 506, 508, 503, 505,
    655, 899, 1180, 1461, 1742, 2023, 2292, 2598, 2867, 3150,
    3431, 3712, 3988, 4217, 4365, 4374, 4387, 4408, 4400, 4423,
    4383, 4302, 4067, 3814, 3566, 3290, 3006, 2727, 2469, 2168,
    1899, 1609, 1332, 1168, 1062, 1085, 1086, 1088, 1093, 1245,// corrected
    1568, 1893, 2302, 2667, 2958, 3270, 3543, 3791, 3828, 3835,
    3821, 3820, 3790, 3519, 3251, 2962, 2672, 2373, 2098, 1871,
    1664, 1534, 1574, 1775, 2018, 2368, 2661, 2957, 2968, 2663,
    2367
  ];
  const yOsa = [
    3490, 3505, 3500, 3499, 3491, 3504, 3498, 3499, 3509, 3496,
    3505, 3492, 3501, 3501, 3490, 3497, 3501, 3499, 3494, 3429,
    3258, 3045, 2792, 2550, 2319, 2102, 1835, 1615, 1354, 1101,
    892, 792, 792, 792, 792, 792, 799, 834, 792, 792,
    792, 792, 842, 915, 1170, 1392, 1746, 1998, 2250, 2511,
    2778, 3014, 3084, 3098, 3098, 3089, 3085, 3098, 3100, 3090,
    3097, 3088, 3072, 2891, 2587, 2332, 2049, 1774, 1465, 1241,// corrected
    1220, 1131, 1155, 1190, 1140, 1191, 1193, 1343, 1595, 1896,
    2124, 2390, 2631, 2669, 2683, 2682, 2684, 2681, 2682, 2629,
    2450, 2208, 1863, 1674, 1540, 1433, 1461, 1610, 1942, 1924,
    1849
  ];

  let c0 = canvas0.getContext("2d");
  let ctxCont = canvasCont.getContext("2d");
  let c1 = canvas1.getContext("2d");
  let cPlayer1 = canvasPlayer1.getContext("2d");
  cPlayer1.color = "rgba(216, 235, 77, 1)"
  cPlayer1.xOsaStart = 4720;
  cPlayer1.yOsaStart = 3180;
  cPlayer1.xOsaEnd = 4720;
  cPlayer1.yOsaEnd = 800;
  let cPlayer2 = canvasPlayer2.getContext("2d");
  cPlayer2.color = "rgba(77, 235, 111, 1)"
  cPlayer2.xOsaStart = 4949;
  cPlayer2.yOsaStart = 3180;
  cPlayer2.xOsaEnd = 4949;
  cPlayer2.yOsaEnd = 800;
  let cPlayer3 = canvasPlayer3.getContext("2d");
  cPlayer3.color = "rgba(77, 225, 235, 1)"
  cPlayer3.xOsaStart = 5185;
  cPlayer3.yOsaStart = 3180;
  cPlayer3.xOsaEnd = 5185;
  cPlayer3.yOsaEnd = 800;
  let cPlayer4 = canvasPlayer4.getContext("2d");
  cPlayer4.color = "rgba(77, 106, 235, 1)"
  cPlayer4.xOsaStart = 5414;
  cPlayer4.yOsaStart = 3180;
  cPlayer4.xOsaEnd = 5414;
  cPlayer4.yOsaEnd = 800;
  let canvasObj = {
    player1: cPlayer1,
    player2: cPlayer2,
    player3: cPlayer3,
    player4: cPlayer4,
  }
  let playerOnMove = [];
  let players = names.map(name => {
    return name
  })
  let arrOfPlayers = []
  namesCopyArr = [...names];
  names.forEach(name => {
    // if (name.name && name.dice) {
      arrOfPlayers.push({ "player": name.name, currentPossition: 0, ctx: canvasObj[name.id], id:name.id, dice:name.dice })
      // }
    })
  names.sort((a, b) => b.dice - a.dice);
  names.forEach(item => {
    if (item.name != "") {
      playerOnMove.push(item.id)
    }
  })

  let playerActive = 0, playerPassive = 3;

  let player1 = document.getElementById("player-1");
  let player2 = document.getElementById("player-2");
  let player3 = document.getElementById("player-3");
  let player4 = document.getElementById("player-4");
  let playerObj = {
    player1: player1,
    player2: player2,
    player3: player3,
    player4: player4

  }

  players.forEach((player, i) => {
    if(player.name){
      playerObj[`player${i + 1}`].textContent = player.name
    }
  })

  player1Container = document.getElementById("player-1-container");
  player2Container = document.getElementById("player-2-container");
  player3Container = document.getElementById("player-3-container");
  player4Container = document.getElementById("player-4-container");
  (() => {

    arrOfPlayers.forEach(player => {
      switch(player.id){
        case 'player1':
          if (player.player ) {
            //      currentOnMove.push("player1");
            player1Container.style.order = playerActive++;
            player1Container.classList.remove("show-nothing")
          } else {
            //  currentOnMove.push("");
            player1Container.style.order = playerPassive--;
            player1Container.classList.add("show-nothing")
          }
          break;
        case 'player2':
          if (player.player ) {
            //      currentOnMove.push("player1");
            player2Container.style.order = playerActive++;
            player2Container.classList.remove("show-nothing")
          } else {
            //  currentOnMove.push("");
            player2Container.style.order = playerPassive--;
            player2Container.classList.add("show-nothing")
          }
          break;
        case 'player3':
        if (player.player) {
          //      currentOnMove.push("player1");
          player3Container.style.order = playerActive++;
          player3Container.classList.remove("show-nothing")
        } else {
          //  currentOnMove.push("");
          player3Container.style.order = playerPassive--;
          player3Container.classList.add("show-nothing")
        }
        break;
        case 'player4':
          if (player.player ) {
            //      currentOnMove.push("player1");
            player4Container.style.order = playerActive++;
            player4Container.classList.remove("show-nothing")
          } else {
            //  currentOnMove.push("");
            player4Container.style.order = playerPassive--;
            player4Container.classList.add("show-nothing")
          }
          break;
        default:
          console.log("Usao u default")
      }
    })
  })()
  
  arrOfPlayers = arrOfPlayers.filter(player => player.player != "")
  arrOfPlayers.sort((a,b) => b.dice - a.dice)
  changeCurrentOnMoveIndicator = (previous, next) => {

    switch (previous) {
      case "player1": player1Container.classList.remove("player-1-border", "next-player-onMove-up");
        player1Container.classList.add("previous-player-onMove-down");
        break;
      case "player2": player2Container.classList.remove("player-2-border", "next-player-onMove-up");
        player2Container.classList.add("previous-player-onMove-down");
        break;
      case "player3": player3Container.classList.remove("player-3-border", "next-player-onMove-up");
        player3Container.classList.add("previous-player-onMove-down");
        break;
      case "player4": player4Container.classList.remove("player-4-border", "next-player-onMove-up");
        player4Container.classList.add("previous-player-onMove-down");
        break;
      default: break;
    }

    switch (next) {
      case "player1": player1Container.classList.remove("previous-player-onMove-down");
        player1Container.classList.add("player-1-border", "next-player-onMove-up");
        break;
      case "player2": player2Container.classList.remove("previous-player-onMove-down");
        player2Container.classList.add("player-2-border", "next-player-onMove-up");
        break;
      case "player3": player3Container.classList.remove("previous-player-onMove-down");
        player3Container.classList.add("player-3-border", "next-player-onMove-up");
        break;
      case "player4": player4Container.classList.remove("previous-player-onMove-down");
        player4Container.classList.add("player-4-border", "next-player-onMove-up");
        break;
      default: break;
    }
  }
  changeCurrentOnMoveIndicator(null, playerOnMove[0]);


  //-------------very first time seting canvas0-4
  canvas0.width = window.innerWidth * 0.8;
  canvas0.height = canvas0.width * 2 / 3;
  canvasCont.width = window.innerWidth * 0.8;
  canvasCont.height = canvas0.width * 2 / 3;
  canvas1.width = window.innerWidth * 0.8;
  canvas1.height = canvas0.width * 2 / 3;
  canvasPlayer1.width = window.innerWidth * 0.8;
  canvasPlayer1.height = canvas0.width * 2 / 3;
  canvasPlayer2.width = window.innerWidth * 0.8;
  canvasPlayer2.height = canvas0.width * 2 / 3;
  canvasPlayer3.width = window.innerWidth * 0.8;
  canvasPlayer3.height = canvas0.width * 2 / 3;
  canvasPlayer4.width = window.innerWidth * 0.8;
  canvasPlayer4.height = canvas0.width * 2 / 3;

  let boardImage = new Image();
  boardImage.onload = function () {
    c0.drawImage(boardImage, 0, 0, canvas0.width, canvas0.height);
  };
  boardImage.src = './img/board.png';

  console.log("*********", boardImage)

  let xRatio = canvas0.width / 5670;
  let yRatio = canvas0.height / 3780;
  let radius = 100 * xRatio;
  let fullCircle = Math.PI * 2;

  ctxCont.beginPath();
  ctxCont.rect(4580 * xRatio, 2900 * yRatio, 974 * xRatio, 350 * yRatio);
  ctxCont.strokeStyle = "green";
  ctxCont.lineWidth = 1;
  ctxCont.stroke();
  ctxCont.closePath();
  ctxCont.fillStyle = "rgba(255, 255, 255, 0.35)"
  drawPin(ctxCont, 4720 * xRatio, 3180 * yRatio);
  drawPin(ctxCont, 4949 * xRatio, 3180 * yRatio);
  drawPin(ctxCont, 5185 * xRatio, 3180 * yRatio);
  drawPin(ctxCont, 5414 * xRatio, 3180 * yRatio);
  ctxCont.beginPath();
  ctxCont.rect(4580 * xRatio, 520 * yRatio, 974 * xRatio, 350 * yRatio);
  ctxCont.stroke();
  ctxCont.closePath();
  drawPin(ctxCont, 4720 * xRatio, 800 * yRatio);
  drawPin(ctxCont, 4949 * xRatio, 800 * yRatio);
  drawPin(ctxCont, 5185 * xRatio, 800 * yRatio);
  drawPin(ctxCont, 5414 * xRatio, 800 * yRatio);

  cPlayer1.fillStyle = cPlayer1.color;
  drawPin(cPlayer1, 4720 * xRatio, 3180 * yRatio);
  cPlayer2.fillStyle = cPlayer2.color;
  drawPin(cPlayer2, 4949 * xRatio, 3180 * yRatio);
  cPlayer3.fillStyle = cPlayer3.color;
  drawPin(cPlayer3, 5185 * xRatio, 3180 * yRatio);
  cPlayer4.fillStyle = cPlayer4.color;
  drawPin(cPlayer4, 5414 * xRatio, 3180 * yRatio);

  /* c1.strokeStyle = "yellow";
  c1.lineWidth = 2;
   */
  /* for(let i = 0; i< xOsa.length; i++){
    c1.beginPath();
    c1.arc(xOsa[i]*xRatio, yOsa[i]*yRatio, radius, 0, fullCircle);
    c1.stroke();
    c1.closePath();
  } */
  //-------------ending first setting canvas

  function dynamicCanvas() {
    console.log(window.innerWidth)
    canvas0.width = window.innerWidth * 0.8;
    canvas0.height = canvas0.width * 2 / 3;
    canvas1.width = window.innerWidth * 0.8;
    canvas1.height = canvas0.width * 2 / 3;
    canvasPlayer1.width = window.innerWidth * 0.8;
    canvasPlayer1.height = canvas0.width * 2 / 3;
    canvasPlayer2.width = window.innerWidth * 0.8;
    canvasPlayer2.height = canvas0.width * 2 / 3;

    boardImage.onload = function () {
      c0.drawImage(boardImage, 0, 0, canvas0.width, canvas0.height);
    };
    boardImage.src = './img/board.png';
    /*  c1.beginPath();
     c1.arc(5200*canvas1.width/5670, 3490*canvas1.height/3780, 100 * canvas1.width/5670, 0, Math.PI *2)
     c1.stroke();
     c1.closePath(); */
  }
  //let currentPossition = 0;
  let i = 0;
  let number = 0;
  let diceNumber = 0;
  let movePlayer = (currentPossition) => {
    console.log(currentPossition)
    if (i < number) {
      setTimeout(function () {
        requestAnimationFrame(() => { movePlayer(currentPossition) })
        c1.beginPath();
        c1.arc(xOsa[i + currentPossition] * xRatio, yOsa[i + currentPossition] * yRatio, radius, 0, fullCircle);
        c1.fillStyle = "rgba(0, 0, 255, 0.5)";
        c1.fill();
        // c1.stroke();
        c1.closePath();
        i++;
      }, 200)
    } else {
      setTimeout(() => endTurn(arrOfPlayers[0].ctx, currentPossition), 1000)
    }
  }
  let movePlayerBack = (currentPossition) => {
    if (i <= number) {
      setTimeout(function () {
        requestAnimationFrame(() => movePlayerBack(currentPossition))
        c1.beginPath();
        c1.arc(xOsa[currentPossition - i - 1] * xRatio, yOsa[currentPossition - i - 1] * yRatio, radius, 0, fullCircle);
        c1.fill();
        c1.fillStyle = "rgba(0, 0, 255, 0.5)";
        // c1.stroke();
        c1.closePath();
        i++;
      }, 200)
    } else {
      setTimeout(() => endTurnBack(arrOfPlayers[0].ctx, currentPossition), 1000)
    }
  }

  let endTurnBack = (ctx, currentPossition) => {
    c1.clearRect(0, 0, canvas0.width, canvas0.height);
    ctx.clearRect(0, 0, canvas0.width, canvas0.height);
    ctx.fillStyle = ctx.color;

    let startingPositionX = arrOfPlayers[0].currentPossition == 0 ? ctx.xOsaStart : xOsa[arrOfPlayers[0].currentPossition - 1];
    let startingPositionY = arrOfPlayers[0].currentPossition == 0 ? ctx.yOsaStart : yOsa[arrOfPlayers[0].currentPossition - 1];

    relocatePawn(ctx, startingPositionX * xRatio, startingPositionY * yRatio, xOsa[currentPossition - i] * xRatio, yOsa[currentPossition - i] * yRatio)

    /*  ctx.beginPath();
     ctx.arc(xOsa[currentPossition - i] * xRatio, yOsa[currentPossition - i] * yRatio, radius * 0.85, 0, fullCircle);
     ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
     ctx.fill()
     ctx.closePath(); */
    i = 0;
    if (occupiedFields.includes(arrOfPlayers[0].currentPossition)) {
      occupiedFields.splice(occupiedFields.indexOf(arrOfPlayers[0].currentPossition), 1);
    }
    arrOfPlayers[0].currentPossition -= number;
    if (occupiedFields.includes(arrOfPlayers[0].currentPossition)) {
      for (let i = 1; i < arrOfPlayers.length; i++) {
        if (arrOfPlayers[i].currentPossition == arrOfPlayers[0].currentPossition) {
          okupator = arrOfPlayers[i];
        }
      }
     // customAlert(`Polje zauzeto! - ${okupator.player}`)
    }
  //  customAlert(`Polje zauzeto! - ${okupator.player}`)
    smazen(okupator);

  
  switch (arrOfPlayers[0].currentPossition) {
    case 1:
      number = 37;
      movePlayer(arrOfPlayers[0].currentPossition);
      break;
    case 5:
      number = 10;
      movePlayer(arrOfPlayers[0].currentPossition);
      break;
    case 9:
      number = 22;
      movePlayer(arrOfPlayers[0].currentPossition);
      break;
    case 16:
      number = 10;
      movePlayerBack(arrOfPlayers[0].currentPossition);
      break;
    case 28:
      number = 56;
      movePlayer(arrOfPlayers[0].currentPossition);
      break;
    case 37:
      number = 6;
      movePlayer(arrOfPlayers[0].currentPossition);
      break;
    case 45:
      number = 19;
      movePlayerBack(arrOfPlayers[0].currentPossition);
      break;
    case 49:
      number = 38;
      movePlayerBack(arrOfPlayers[0].currentPossition);
      break;
    case 51:
      number = 17;
      movePlayer(arrOfPlayers[0].currentPossition);
      break;
    case 56:
      number = 9;
      movePlayerBack(arrOfPlayers[0].currentPossition);
      break;
    case 62:
      number = 43;
      movePlayerBack(arrOfPlayers[0].currentPossition);
      break;
    case 64:
      number = 4;
      movePlayerBack(arrOfPlayers[0].currentPossition);
      break;
    case 72:
      number = 18;
      movePlayer(arrOfPlayers[0].currentPossition);
      break;
    case 80:
      number = 19;
      movePlayer(arrOfPlayers[0].currentPossition);
      break;
    case 87:
      number = 63;
      movePlayerBack(arrOfPlayers[0].currentPossition);
      break;
    case 92:
      number = 19;
      movePlayerBack(arrOfPlayers[0].currentPossition);
      break;
    case 95:
      number = 19;
      movePlayerBack(arrOfPlayers[0].currentPossition);
      break;
    case 98:
      number = 20;
      movePlayerBack(arrOfPlayers[0].currentPossition);
      break;
    default:
      occupiedFields.push(arrOfPlayers[0].currentPossition)
     // console.log("zauzetoF", occupiedFields)      
        if (diceNumber != 6) {
          if (counter == playerOnMove.length) {
            turnFinished = true;
            counter = 1;
          } else {
            turnFinished = false;
            counter++;
          }
          console.log("hello winner BACK: ", counter, turnFinished, haveWinner)
          if (haveWinner && turnFinished) {
            return setTimeout(() => customAlert("game over!"), 2500)
          }
          arrOfPlayers.push(arrOfPlayers.shift());
          playerOnMove.push(playerOnMove.shift());
          changeCurrentOnMoveIndicator(playerOnMove[playerOnMove.length-1], playerOnMove[0]);
        }
        diceDIV.addEventListener('click', rollDice);
        break;
    }
  }

  function smazen(ctx) {
    if (ctx.currentPossition - 12 > 0) {
      relocatePawn(ctx.ctx, xOsa[ctx.currentPossition - 1] * xRatio, yOsa[ctx.currentPossition - 1] * yRatio, xOsa[ctx.currentPossition - 13] * xRatio, yOsa[ctx.currentPossition - 13] * yRatio);
      occupiedFields.splice(occupiedFields.indexOf(ctx.currentPossition), 1);
      ctx.currentPossition -= 12;
      occupiedFields.push(ctx.currentPossition);
    } else {
      relocatePawn(ctx.ctx, xOsa[ctx.currentPossition - 1] * xRatio, yOsa[ctx.currentPossition - 1] * yRatio, ctx.ctx.xOsaStart * xRatio, ctx.ctx.yOsaStart * yRatio);
      occupiedFields.splice(occupiedFields.indexOf(ctx.currentPossition), 1);
      ctx.currentPossition = 0;
    }

  }

  let endTurn = (ctx, currentPossition) => {
    c1.clearRect(0, 0, canvas0.width, canvas0.height);
    ctx.clearRect(0, 0, canvas0.width, canvas0.height);
    ctx.fillStyle = ctx.color;

    let startingPositionX = arrOfPlayers[0].currentPossition == 0 ? ctx.xOsaStart : xOsa[arrOfPlayers[0].currentPossition - 1];
    let startingPositionY = arrOfPlayers[0].currentPossition == 0 ? ctx.yOsaStart : yOsa[arrOfPlayers[0].currentPossition - 1];

    if (arrOfPlayers[0].currentPossition + number == 100) {
      relocatePawn(ctx, startingPositionX * xRatio, startingPositionY * yRatio, xOsa[i + currentPossition - 1] * xRatio, yOsa[i + currentPossition - 1] * yRatio);
      haveWinner = true;
      ctx.winner = true;
      diceNumber = 0;
      setTimeout(() => {
        relocatePawn(ctx, xOsa[99] * xRatio, yOsa[99] * yRatio, ctx.xOsaEnd * xRatio, ctx.yOsaEnd * yRatio)
      }, 1000)
    } else if (arrOfPlayers[0].currentPossition + number == 101) {
      relocatePawn(ctx, startingPositionX * xRatio, startingPositionY * yRatio, xOsa[100] * xRatio, yOsa[100] * yRatio)
      haveWinner = true;
      ctx.winner = true;
      diceNumber = 0;
      setTimeout(() => {
        relocatePawn(ctx, xOsa[100] * xRatio, yOsa[100] * yRatio, ctx.xOsaEnd * xRatio, ctx.yOsaEnd * yRatio)
      }, 1000)
    } else if (arrOfPlayers[0].currentPossition + number > 101) {
      occupiedFields.splice(occupiedFields.indexOf(arrOfPlayers[0].currentPossition), 1);
      drawPin(ctx, xOsa[arrOfPlayers[0].currentPossition - 1] * xRatio, yOsa[arrOfPlayers[0].currentPossition - 1] * yRatio)
      arrOfPlayers[0].currentPossition -= number;
    } else {
      relocatePawn(ctx, startingPositionX * xRatio, startingPositionY * yRatio, xOsa[i + currentPossition - 1] * xRatio, yOsa[i + currentPossition - 1] * yRatio)
    }

    /* ctx.beginPath();
    ctx.arc(xOsa[i + currentPossition - 1] * xRatio, yOsa[i + currentPossition - 1] * yRatio, radius * 0.85, 0, fullCircle);
    ctx.fill()
    ctx.closePath(); */
    i = 0;
    if (occupiedFields.includes(arrOfPlayers[0].currentPossition)) {
      occupiedFields.splice(occupiedFields.indexOf(arrOfPlayers[0].currentPossition), 1);
    }
    arrOfPlayers[0].currentPossition += number;
    if (occupiedFields.includes(arrOfPlayers[0].currentPossition)) {
      for (let i = 1; i < arrOfPlayers.length; i++) {
        if (arrOfPlayers[i].currentPossition == arrOfPlayers[0].currentPossition) {
          okupator = arrOfPlayers[i];
        }
      }
      //  customAlert(`Polje zauzeto! - ${okupator.player}`)
      smazen(okupator);

    }
    switch (arrOfPlayers[0].currentPossition) {
      case 1:
        number = 37;
        movePlayer(arrOfPlayers[0].currentPossition);
        break;
      case 5:
        number = 10;
        movePlayer(arrOfPlayers[0].currentPossition);
        break;
      case 9:
        number = 22;
        movePlayer(arrOfPlayers[0].currentPossition);
        break;
      /*  case 16:
         number = 10;
         movePlayerBack(arrOfPlayers[0].currentPossition);
         break; */
      case 28:
        number = 56;
        movePlayer(arrOfPlayers[0].currentPossition);
        break;
      case 37:
        number = 6;
        movePlayer(arrOfPlayers[0].currentPossition);
        break;
      /* case 45:
        number = 19;
        movePlayerBack(arrOfPlayers[0].currentPossition);
        break; */
      /* case 49:
        number = 38;
        movePlayerBack(arrOfPlayers[0].currentPossition);
        break; */
      case 51:
        number = 17;
        movePlayer(arrOfPlayers[0].currentPossition);
        break;
      /* case 56:
        number = 9;
        movePlayerBack(arrOfPlayers[0].currentPossition);
        break;
      case 62:
        number = 43;
        movePlayerBack(arrOfPlayers[0].currentPossition);
        break;
      case 64:
        number = 4;
        movePlayerBack(arrOfPlayers[0].currentPossition);
        break; */
      case 72:
        number = 18;
        movePlayer(arrOfPlayers[0].currentPossition);
        break;
      case 80:
        number = 19;
        movePlayer(arrOfPlayers[0].currentPossition);
        break;
      /* case 87:
        number = 63;
        movePlayerBack(arrOfPlayers[0].currentPossition);
        break;
      case 92:
        number = 19;
        movePlayerBack(arrOfPlayers[0].currentPossition);
        break;
      case 95:
        number = 19;
        movePlayerBack(arrOfPlayers[0].currentPossition);
        break;
      case 98:
        number = 20;
        movePlayerBack(arrOfPlayers[0].currentPossition);
        break; */
      default:
        occupiedFields.push(arrOfPlayers[0].currentPossition)
        // console.log("zauzetoF", occupiedFields)      
        if (diceNumber != 6) {
          if (counter == playerOnMove.length) {
            turnFinished = true;
            counter = 1;
          } else {
            turnFinished = false;
            counter++;
          }
          console.log("hello winner: ", counter, turnFinished, haveWinner)
          if (haveWinner && turnFinished) {
            return setTimeout(() => customAlert("game over!"), 2500)
          }
          arrOfPlayers.push(arrOfPlayers.shift());
          playerOnMove.push(playerOnMove.shift());
          changeCurrentOnMoveIndicator(playerOnMove[playerOnMove.length-1], playerOnMove[0]);
        }
        console.log(occupiedFields)
        diceDIV.addEventListener('click', rollDice);
        break;
    }
  }

  window.onresize = () => dynamicCanvas();
  // canvas0.onclick = () => alert("clicked canvas");
  // canvas0.style.border = "1px solid black";

  /* relocate player's pawn starts here */

  function relocatePawn(ctx, xs, ys, xd, yd) {
    /* let [xs, ys] = [750, 590];
    let [xc, yc] = [350, 250];
    let [xd, yd] = [80, 350]; */
    xc = (xd - xs) * 0.75 + xs
    yc = yd <= ys ? (4 * yd - 3 * ys) * 0.65 : (4 * ys - 3 * yd) * 0.65;
    let xr, yr, xl, yl, x, y;

    let i = 0;
    let n = 64;
    let radius = 10;
    let resizer = 1;

    function makeMove() {
      if (i <= n) {
        ctx.clearRect(0, 0, canvas0.width, canvas0.height)
        requestAnimationFrame(makeMove)
        /* if (i > 0 && i < n/2) {
          resizer += 2*1/n;
        } else if (i >= n/2 && i < n) {
          resizer -= 2*1/n;
        } else {
          resizer = 1;
        } */
        xr = (xc - xs) * i / n + xs;
        yr = ys - (ys - yc) * (i) / n;
        xl = (xd - xc) * i / n + xc;
        yl = yd - (yd - yc) * (n - i) / n;
        x = (xl - xr) * i / n + xr;
        y = yl - (yl - yr) * (n - i) / n;
        /*  console.log("sta je ovde: ", x, y)
         ctx.beginPath();
         ctx.moveTo(xs, ys);
         ctx.quadraticCurveTo(xc, yc, xd, yd);
         ctx.stroke();
         ctx.closePath();
         ctx.beginPath();
         ctx.arc(xc, yc, 5, 0, Math.PI * 2, false) */
        /*  ctx.fillStyle = "red" */
        /* ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(xs, ys, 5, 0, Math.PI * 2, false) */
        /*  ctx.fillStyle = "red" */
        /* ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(xd, yd, 5, 0, Math.PI * 2, false) */
        /*  ctx.fillStyle = "red" */
        /*  ctx.fill();
         ctx.closePath();
         console.log("evo ga poziv x y", x , y) */
        drawPin(ctx, x, y);
        i++;
      } else {
        ctx.restore();
      }
    }

    makeMove();
  }
  function drawPin(ctx, x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-25, 0);
    ctx.lineTo(0, -50);
    ctx.lineTo(25, 0);
    ctx.closePath();
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.arc(0, -15, 24, Math.PI / 6, Math.PI * 5 / 6, false)
    ctx.closePath();
    ctx.arc(0, -50, 15, 0, Math.PI * 2, false)
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }


  /* relocate player's pawn ends here */


  /* dice section starts here */
  const sides = [...document.querySelectorAll(".die-item")];
  diceDIV.addEventListener('click', rollDice);

  let diceCounterTest = 0;
  let diceTestArr = [3, 3, 6, 6, 6, 6]
  function rollDice() {
    diceDIV.removeEventListener('click', rollDice);
    const dice = [...document.querySelectorAll(".die-list")];
    for (let i = 1; i <= 6; i++) {
      sides[i - 1].classList.remove("hide-side");
    }
    dice.forEach(die => {
      die.dataset.roll = getRandomNumber(1, 6);
      // die.dataset.roll = diceTestArr[diceCounterTest];
      // diceCounterTest++
      number = +die.dataset.roll;
      diceNumber = number;
      toggleClasses(die);
    });
    setTimeout(() => movePlayer(arrOfPlayers[0].currentPossition), 1500);
  }

  function toggleClasses(die) {
    die.classList.toggle("odd-roll");
    die.classList.toggle("even-roll");
    setTimeout(() => {
      for (let i = 1; i <= 6; i++) {
        if (i == die.dataset.roll) {
          continue;
        } else {
          sides[i - 1].classList.add("hide-side");
        }
      }
    }, 1150)
  }

}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

(() => memoryGameHtmlChild.remove())();
(() => mountainGameHtmlChild.remove())();

