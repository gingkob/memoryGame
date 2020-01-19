console.log("hello world!");
const canvas = document.getElementById("canvas1");
let c = canvas.getContext("2d");

let dynamicCanvas = () => {
  canvas.width = window.innerWidth * 0.6;
  canvas.height = canvas.width /2 ;
  c.rect( canvas.width/20, canvas.height/10, canvas.width/20, canvas.width/20);
  c.stroke();
}

window.onresize = () => dynamicCanvas();
canvas.onclick = () => alert("clicked canvas");
canvas.style.border = "1px solid black";


// c.style.width = 700;
console.log(canvas)
