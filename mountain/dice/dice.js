const sides = [...document.querySelectorAll(".die-item")]

function rollDice() {
  const dice = [...document.querySelectorAll(".die-list")];
  for (let i = 1; i <= 6; i++){
        sides[i-1].classList.remove("hide-side");
        console.log(sides[i-1])
    }
  dice.forEach(die => {
    die.dataset.roll = getRandomNumber(1, 6);
    toggleClasses(die);
    console.log(die)
  });
}

function toggleClasses(die) {
  die.classList.toggle("odd-roll");
  die.classList.toggle("even-roll");
  setTimeout(() => {for (let i = 1; i <= 6; i++){
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

document.getElementById("roll-button").addEventListener("click", rollDice);
