const canvas0 = document.getElementById("canvas0");
const canvas1 = document.getElementById("canvas1");
//const canvas2 = document.getElementById("canvas2");
//const canvas3 = document.getElementById("canvas3");
//const canvas4 = document.getElementById("canvas4");
//const canvas5 = document.getElementById("canvas5"); // for rolling dice webgl


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

c1.arc(5200*canvas1.width/5670, 3490*canvas1.height/3780, 100 * canvas1.width/5670, 0, Math.PI *2)
c1.stroke();
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

window.onresize = () => dynamicCanvas();
canvas0.onclick = () => alert("clicked canvas");
canvas0.style.border = "1px solid black";



// c.style.width = 700;
console.log(canvas0)
