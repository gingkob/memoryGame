const canvas0 = document.getElementById("canvas0");
const canvas1 = document.getElementById("canvas1");
//const canvas2 = document.getElementById("canvas2");
//const canvas3 = document.getElementById("canvas3");
//const canvas4 = document.getElementById("canvas4");
//const canvas5 = document.getElementById("canvas5"); // for rolling dice webgl

const xOsa = [
              5200, 4970, 4740, 4507, 4288, 4041, 3783, 3559, 3335, 3113,
              2885, 2649, 2417, 2184, 1953, 1718, 1488, 1267, 965, 702,
              568, 514, 504, 500, 505, 501, 502, 508, 499, 501,
              651, 896, 1176, 1457, 1739, 2020, 2291, 2596, 2862, 3144,
              3426, 3706, 3983, 4212, 4363, 4369, 4383, 4403, 4392, 4417,
              4381, 4298, 4062, 3809, 3561, 3287, 3001, 2724, 2465, 2166,
              1897, 1609, 1328, 1167, 1058, 1082, 1081, 1086, 1088, 1241,
              1568, 1893, 2302, 2667, 2958, 3270, 3543, 3791, 3828, 3835,
              3821, 3820, 3790, 3519, 3251, 2962, 2670, 2373, 2098, 1871,
              1664, 1531, 1574, 1775, 2015, 2365, 2658, 2954, 2962, 2659,
              2363
            ];
const yOsa = [
              3490, 3500, 3495, 3495, 3483, 3498, 3492, 3493, 3504, 3490,
              3501, 3487, 3495, 3496, 3485, 3494, 3496, 3493, 3489, 3423,
              3252, 3039, 2786, 2545, 2313, 2096, 1830, 1610, 1350, 1098,
              888, 788, 788, 787, 787, 788, 795, 831, 788, 787,
              787, 788, 837, 910, 1167, 1388, 1743, 1991, 2246, 2506,
              2772, 3009, 3079, 3093, 3093, 3086, 3079, 3092, 3095, 3085,
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
   c1.beginPath();
   c1.arc(5200*canvas1.width/5670, 3490*canvas1.height/3780, 100 * canvas1.width/5670, 0, Math.PI *2)
   c1.stroke();
   c1.closePath();
}
let currentPossition = 0;
let i = 0;
let number = 0;
let movePlayer = () => {
  if (i < number){
    console.log("usao ", number, typeof number);    
    requestAnimationFrame(movePlayer)
    c1.beginPath();
    c1.arc(xOsa[i+currentPossition]*xRatio, yOsa[i+currentPossition]*yRatio, radius, 0, fullCircle);
    c1.fill();
    c1.stroke();
    c1.closePath(); 
    i++;
  }else{
    c1.clearRect(0, 0, canvas1.width, canvas1.height);
    c1.beginPath();
    c1.arc(xOsa[i+currentPossition-1]*xRatio, yOsa[i+currentPossition-1]*yRatio, radius*0.75, 0, fullCircle);
    c1.fillStyle= "rgba(0, 0, 255, 0.5)";
    c1.fill()   
    // c1.stroke();
    c1.closePath();
    i=0;
    currentPossition += number;
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
