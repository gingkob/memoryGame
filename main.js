let names = {};
let memoryGameHtml = document.getElementById("memory-game-html");
let memoryGameHtmlChild = document.getElementById("memory-game-html-child")
(() => memoryGameHtmlChild.remove())()
let memoryCall = () => { 
 /*  names = {
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

  if(validator <= 2){ */
    window.open("./memory/memory.html")
  /* }else{
    alert("Potrebno je bar 2 igraca za igru memorije")
  } */

}
let climbingToTheMountainCall = () => window.open("./mountain/mountain.html");

