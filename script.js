const gameContainer = document.getElementById("game");
const pauseBody = document.body;
const startBtn = document.getElementById("btnStart");
const score = document.getElementById("score");
const tscore = document.getElementById("topscore");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {

	card = 0;

  for (let color of colorArray) {
    // create a new div
	const newDiv = document.createElement("div");

	card++;
	// give it a class attribute for the value we are looping over
	newDiv.classList.add(color);
	newDiv.id = card;

	// call a function handleCardClick when a div is clicked on
	newDiv.addEventListener("click", handleCardClick);

	// append the div to the element with an id of game
	gameContainer.append(newDiv);
	}
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
	// console.log("you just clicked", event.target);
	let color = event.target.className;
	event.target.style.backgroundColor = color;
}

// when the DOM loads
tscore.innerHTML = JSON.parse(localStorage.getItem("topScore"));

startBtn.addEventListener('click', function(e) {
	e.preventDefault();
	createDivsForColors(shuffledColors);
	startBtn.remove();
})

function createRestartButton() {
	const newBtn = document.createElement("button");
	newBtn.id = 'btnRestart';
	newBtn.innerText = "RESTART";
	newBtn.addEventListener("click", restartOnFinish);
	gameContainer.append(newBtn);
}

function restartOnFinish() {
	location.reload();
}

function topScoreUpdate() {
	if (JSON.parse(localStorage.getItem("topScore")) > score.innerHTML)
		localStorage.setItem("topScore", score.innerHTML);
	tscore.innerHTML = JSON.parse(localStorage.getItem("topScore"));
}

function createPause() {
	const pauseDiv = document.createElement("div");
	pauseDiv.classList.add("pause");
	pauseBody.prepend(pauseDiv);
	const id = setInterval(func, 1000);
	function func(){
		pauseDiv.classList.remove("pause");
		clearInterval(id);
	}
}

let total = COLORS.length;
let arrColors = [];
let clickCounter = 1;

function compareColors(arr) {
	if (arr.length === 2)
		createPause();
	const id = setInterval(func, 1000);
	function func() {
		if (arr.length === 2) {
			if (arr[0]["class"] === arr[1]["class"]) {
				arrColors = [];
				if (arr[0]["index"] !== arr[1]["index"]) {
					total--;
					clearInterval(id);
				}
				if (total === 0) {
					createRestartButton();
					topScoreUpdate();
					clearInterval(id);
				}
			} else {
				document.getElementById(arr[0]["index"]).removeAttribute("style");
				document.getElementById(arr[1]["index"]).removeAttribute("style");
				arrColors = [];
				clearInterval(id);
			}
		}
	}
}

gameContainer.addEventListener('click', function(e) {
	e.preventDefault();
	score.innerHTML = clickCounter++;

	if (e.target.style.backgroundColor) {
		arrColors.push({class: e.target.className, index: e.target.id});
	}
	if (arrColors.length === 2 && arrColors[0]["index"] === arrColors[1]["index"]) {
		arrColors.pop();
	}
	compareColors(arrColors);
})
