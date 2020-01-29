let canvas = document.getElementById("canvas");
canvas.width = 800;
canvas.height = 600;
canvas.style.border = "1px solid green"
let ctx = canvas.getContext("2d");

let [xs, ys] = [750, 590];
let [xc, yc] = [350, 250];
let [xd, yd] = [80, 350];
xc = (xd - xs) * 0.75 + xs
yc = yd <= ys ? (4*yd - 3*ys) * 0.45 : (4*ys - 3*yd) * 0.45;
let xr, yr, xl, yl, x, y;

let i = 0;
let n = 256;
let radius = 10;
let resizer = 1;
let pin = { x:250, y:250, color:"red" };
function makeMove(){
  if(i <= n) {
    ctx.clearRect(0,0,800,600)
    requestAnimationFrame(makeMove)
    /* if (i > 0 && i < n/2) {
      resizer += 2*1/n;
    } else if (i >= n/2 && i < n) {
      resizer -= 2*1/n;
    } else {
      resizer = 1;
    } */
    xr = (xc-xs)*i/n + xs;
    yr = ys - (ys-yc)*(i)/n;
    xl = (xd-xc)*i/n + xc;
    yl = yd - (yd-yc)*(n-i)/n;
    x = (xl-xr)*i/n + xr;
    y = yl - (yl - yr)*(n-i)/n;

    pin.x = x;
    pin.y = y;

    /* ctx.beginPath();
    ctx.arc(x, y, radius * resizer, 0, Math.PI *2, false)
    ctx.fillStyle = "blue"
    ctx.fill();
    ctx.closePath(); */
    
    ctx.beginPath();
    ctx.moveTo(xs, ys);
    ctx.quadraticCurveTo(xc, yc, xd, yd);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(xc, yc, 5, 0, Math.PI *2, false)
    ctx.fillStyle = "red"
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(xs, ys, 5, 0, Math.PI *2, false)
    ctx.fillStyle = "red"
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(xd, yd, 5, 0, Math.PI *2, false)
    ctx.fillStyle = "red"
    ctx.fill();
    ctx.closePath();
    drawPin(pin);
    i++;
  } else {
    
  }
}

function drawPin(pin){

  ctx.save();
  ctx.translate(pin.x,pin.y);

  ctx.beginPath();
  ctx.moveTo(0,0);
  /* ctx.bezierCurveTo(20,-10,50,-125,0,-30);
  ctx.bezierCurveTo(-50,-125,-20,-10,0,0); */
  // ctx.fillStyle=pin.color;
 /*  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.moveTo(50, 150); */
  ctx.lineTo(-25, 0);
  ctx.lineTo(0, -50);
  ctx.lineTo(25, 0);
  ctx.closePath();
  ctx.lineTo(0, 0);
  ctx.closePath();
  ctx.arc(0, -15, 24, Math.PI/6, Math.PI*5/6, false)
  
  ctx.closePath();
  //ctx.beginPath();
  ctx.arc(0, -50, 15, 0, Math.PI * 2, false)
  ctx.closePath();
  
  ctx.fillStyle=pin.color;
  ctx.fill();
  // ctx.stroke();
/*   ctx.strokeStyle="black";
  ctx.lineWidth=1.5;
  ctx.stroke(); */
  /* ctx.beginPath();
  ctx.arc(0,-21,3,0,Math.PI*2);
  ctx.closePath();
  ctx.fillStyle="black";
  ctx.fill(); */

  ctx.restore();
}

makeMove();

