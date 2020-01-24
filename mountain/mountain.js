const canvas0 = document.getElementById("canvas0");
const canvas1 = document.getElementById("canvas1");
//const canvas2 = document.getElementById("canvas2");
//const canvas3 = document.getElementById("canvas3");
//const canvas4 = document.getElementById("canvas4");
//const canvas5 = document.getElementById("canvas5"); // for rolling dice webgl

const xOsa = [
              5200, 4975, 4743, 4511, 4294, 4046, 3788, 3564, 3338, 3118,
              2889, 2651, 2420, 2187, 1956, 1720, 1491, 1270, 970, 705,
              573, 519, 508, 505, 508, 505, 506, 508, 503, 505, 
              655, 899, 1180, 1461, 1742, 2023, 2292, 2598, 2867, 3150, 
              3426, 3706, 3983, 4212, 4363, 4369, 4383, 4403, 4392, 4417,// corrected
              4385, 4298, 4062, 3809, 3561, 3287, 3001, 2724, 2465, 2166,
              1897, 1609, 1328, 1167, 1058, 1082, 1081, 1086, 1088, 1241,
              1568, 1893, 2302, 2667, 2958, 3270, 3543, 3791, 3828, 3835,
              3821, 3820, 3790, 3519, 3251, 2962, 2670, 2373, 2098, 1871,
              1664, 1531, 1574, 1775, 2015, 2365, 2658, 2954, 2962, 2659,
              2363
            ];
const yOsa = [
              3490, 3505, 3500, 3499, 3491, 3504, 3498, 3499, 3509, 3496,
              3505, 3492, 3501, 3501, 3490, 3497, 3501, 3499, 3494, 3429,
              3258, 3045, 2792, 2550, 2319, 2102, 1835, 1615, 1354, 1101, 
              892, 792, 792, 792, 792, 792, 799, 834, 792, 792, 
              787, 788, 837, 910, 1167, 1388, 1743, 1991, 2246, 2506,// corrected
              2775, 3009, 3079, 3093, 3093, 3086, 3079, 3092, 3095, 3085,
              3092, 3088, 3067, 2888, 2582, 2326, 2043, 1769, 1461, 1236,
              1220, 1131, 1155, 1190, 1140, 1191, 1193, 1343, 1595, 1896,
              2124, 2390, 2631, 2669, 2683, 2682, 2680, 2681, 2682, 2629,
              2450, 2203, 1863, 1674, 1537, 1428, 1456, 1610, 1936, 1920,
              1843
            ];

let c0 = canvas0.getContext("2d");
let c1 = canvas1.getContext("2d");


//-------------very first time seting canvas0-4
canvas0.width = window.innerWidth * 0.8;
canvas0.height = canvas0.width *2/3 ;
canvas1.width = window.innerWidth * 0.8;
canvas1.height = canvas1.width *2/3 ;

let boardImage = new Image();
boardImage.onload = function() {
  c0.drawImage(boardImage, 0, 0, canvas0.width, canvas0.height );
};
boardImage.src = './img/board.png';
let xRatio = canvas1.width/5670;
let yRatio = canvas1.height/3780;
let radius = 100 * xRatio;
let fullCircle = Math.PI *2;

/* c1.strokeStyle = "yellow";
c1.lineWidth = 3; */

for(let i = 0; i< xOsa.length; i++){
  c1.beginPath();
  c1.arc(xOsa[i]*xRatio, yOsa[i]*yRatio, radius, 0, fullCircle);
  c1.stroke();
  c1.closePath();
}
//-------------ending first setting canvas

let dynamicCanvas = () => {
  canvas0.width = window.innerWidth * 0.8;
  canvas0.height = canvas0.width *2/3 ;
  canvas1.width = window.innerWidth * 0.8;
  canvas1.height = canvas1.width *2/3 ;
 
  boardImage.onload = function() {
    c0.drawImage(boardImage, 0, 0, canvas0.width, canvas0.height );    
  };
  boardImage.src = './img/board.png';
  /*  c1.beginPath();
   c1.arc(5200*canvas1.width/5670, 3490*canvas1.height/3780, 100 * canvas1.width/5670, 0, Math.PI *2)
   c1.stroke();
   c1.closePath(); */
}
let currentPossition = 0;
let i = 0;
let number = 0;
let movePlayer = () => {
  if (i < number){    
    requestAnimationFrame(movePlayer)
    c1.beginPath();
    c1.arc(xOsa[i+currentPossition]*xRatio, yOsa[i+currentPossition]*yRatio, radius, 0, fullCircle);
    c1.fillStyle = "rgba(0, 0, 255, 0.5)";
    c1.fill();
    // c1.stroke();
    c1.closePath(); 
    i++;
  }else{
    setTimeout(() => endTurn(), 1000)
  } 
}

let movePlayerBack = () => {
  if (i <= number){    
    requestAnimationFrame(movePlayerBack)
    c1.beginPath();
    c1.arc(xOsa[currentPossition-i-1]*xRatio, yOsa[currentPossition-i-1]*yRatio, radius, 0, fullCircle);
    c1.fill();
    // c1.stroke();
    c1.closePath(); 
    i++;
  }else{
    setTimeout(() => endTurnBack(), 1000)
  } 
}

let endTurnBack = () => {
  c1.clearRect(0, 0, canvas1.width, canvas1.height);
  c1.beginPath();
  c1.arc(xOsa[currentPossition-i]*xRatio, yOsa[currentPossition-i]*yRatio, radius*0.85, 0, fullCircle);
  c1.fillStyle = "rgba(0, 0, 255, 0.5)";
  c1.fill()
  c1.closePath();
  i=0;
  currentPossition -= number;
  switch (currentPossition){
    case 1: 
      number = 37;
      movePlayer(); 
      break;
    case 5:
      number = 10;
      movePlayer(); 
      break;
    case 9:
      number = 22;
      movePlayer(); 
      break;
    case 16:
      number = 10;
      movePlayerBack(); 
      break;
    case 28:
      number = 56;
      movePlayer(); 
      break;
    case 37:
      number = 6;
      movePlayer(); 
      break;
    case 45:
      number = 19;
      movePlayerBack();
      break;
    case 49:
      number = 38;
      movePlayerBack();
      break;
    case 51:
      number = 17;
      movePlayer(); 
      break;
    case 56:
      number = 9;
      movePlayerBack();
      break;
    case 62:
      number = 43;
      movePlayerBack();
      break;
    case 64:
      number = 4;
      movePlayerBack();
      break;
    case 72:
      number = 18;
      movePlayer(); 
      break;
    case 80:
      number = 19;
      movePlayer(); 
      break;
    case 87:
      number = 63;
      movePlayerBack();
      break;
    case 92:
      number = 19;
      movePlayerBack();
      break;
    case 95:
      number = 19;
      movePlayerBack();
      break;
    case 98:
      number = 20;
      movePlayerBack();
      break;
    default:
      diceDIV.addEventListener('click', rollDice);
      break;
  }
}

let endTurn = () => {
    c1.clearRect(0, 0, canvas1.width, canvas1.height);
    c1.beginPath();
    c1.arc(xOsa[i+currentPossition-1]*xRatio, yOsa[i+currentPossition-1]*yRatio, radius*0.85, 0, fullCircle);
    c1.fillStyle= "rgba(0, 0, 255, 0.5)";
    c1.fill()
    c1.closePath();
    i=0;
    currentPossition += number;
    switch (currentPossition){
      case 1: 
        number = 37;
        movePlayer(); 
        break;
      case 5:
        number = 10;
        movePlayer(); 
        break;
      case 9:
        number = 22;
        movePlayer(); 
        break;
      case 16:
        number = 10;
        movePlayerBack(); 
        break;
      case 28:
        number = 56;
        movePlayer(); 
        break;
      case 37:
        number = 6;
        movePlayer(); 
        break;
      case 45:
        number = 19;
        movePlayerBack();
        break;
      case 49:
        number = 38;
        movePlayerBack();
        break;
      case 51:
        number = 17;
        movePlayer(); 
        break;
      case 56:
        number = 9;
        movePlayerBack();
        break;
      case 62:
        number = 43;
        movePlayerBack();
        break;
      case 64:
        number = 4;
        movePlayerBack();
        break;
      case 72:
        number = 18;
        movePlayer(); 
        break;
      case 80:
        number = 19;
        movePlayer(); 
        break;
      case 87:
        number = 63;
        movePlayerBack();
        break;
      case 92:
        number = 19;
        movePlayerBack();
        break;
      case 95:
        number = 19;
        movePlayerBack();
        break;
      case 98:
        number = 20;
        movePlayerBack();
        break;
      default:
        diceDIV.addEventListener('click', rollDice);
        break;
    }
}

window.onresize = () => dynamicCanvas();
canvas0.onclick = () => alert("clicked canvas");
canvas0.style.border = "1px solid black";


/* dice section starts here */
const sides = [...document.querySelectorAll(".die-item")];
const diceDIV = document.querySelector(".dice");
diceDIV.addEventListener('click', rollDice);


function rollDice() {
  diceDIV.removeEventListener('click', rollDice);
  const dice = [...document.querySelectorAll(".die-list")];
  for (let i = 1; i <= 6; i++){
        sides[i-1].classList.remove("hide-side");
    }
  dice.forEach(die => {
    die.dataset.roll = getRandomNumber(1, 6);
    number = +die.dataset.roll;
    toggleClasses(die);
  });
 setTimeout(() => movePlayer(), 1500);
}

function toggleClasses(die) {
  die.classList.toggle("odd-roll");
  die.classList.toggle("even-roll");
  setTimeout(() => {
    for (let i = 1; i <= 6; i++){
      if (i == die.dataset.roll){
        continue;
      }else {
        sides[i-1].classList.add("hide-side");
      }}
    }, 1150)
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// document.getElementById("roll-button").addEventListener("click", rollDice);
/* dice section ends here */
