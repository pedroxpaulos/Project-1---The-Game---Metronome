let counter = 0;
let bpm = 120;
//counterclock for the whole game
function mainClock() {
	let update = setInterval(() => {
		if (counter < 9) {
			seqTrigger();
			// console.log(counter);
			counter++;
			if (counter === 8) {
				counter = 0;
			}
		}
	}, 60000 / bpm);
}

//function to trigger the lights in the stepSequencer
//code could be better
function seqTrigger() {
	if (counter < 8 && counter !== 0) {
		metroArray[counter].colorChange();
		metroArray[counter - 1].colorOriginal();
		if (userArray[counter] === 'X' && !playerWon) {
			keyArray[counter].metroNotePlay();
		}
		if (userArray[counter] === 'X' && playerWon) {
			keyArray[counter].colorWinner();
		}
		//changes the lights to orange when they are in sync with the metronome clock
		if (userArray[counter - 1] === 'X' && !playerWon) {
			keyArray[counter - 1].colorChange();
		}
	}
	if (counter === 0) {
		if (userArray[7] === 'X' && !playerWon) {
			keyArray[7].colorChange();
		}
		if (userArray.toString() === solutionArray.toString()) {
			playerWon = true;
		}
		metroArray[0].colorChange();
		metroArray[7].colorOriginal();
		if (userArray[0] === 'X' && !playerWon) {
			keyArray[0].metroNotePlay();
		}
		if (userArray[0] === 'X' && playerWon) {
			keyArray[0].colorWinner();
		}
		if (userArray[7] === 'X' && !playerWon) {
			keyArray[7].colorChange();
		}
	}
}
class Button {
	constructor(id) {
		this.id = id;
		this.positionX = 10 * this.id;
		this.positionY = 30;
		this.width = 9;
		this.height = 30;
		this.lightOn = false;
		this.domElement = null;
		this.index = this.id;

		this.createDomElement();
	}

	createDomElement() {
		this.domElement = document.createElement('div');
		this.domElement.id = 'button';
		this.domElement.style.width = this.width + 'vw';
		this.domElement.style.height = this.height + 'vh';
		this.domElement.style.left = this.positionX + 'vw';
		this.domElement.style.bottom = this.positionY + 'vh';

		const parentElm = document.getElementById('board');
		parentElm.appendChild(this.domElement);
		this.domElement.addEventListener('click', () => {
			if (this.lightOn) {
				this.colorOriginal();
			} else {
				this.colorChange();
			}
		});
	}
	colorChange() {
		//changes the color to the color in action
		this.domElement.style.backgroundColor = `var(--secondary)`;
		this.domElement.style.boxShadow = `4px 4px 50px #ee6c4d`; //unable to use var(--title) here.
		this.lightOn = true;
		userArray[this.id - 1] = 'X'; // Why -1?
	}
	metroNotePlay() {
		//changes the color to the color in action
		this.domElement.style.backgroundColor = `var(--third)`;
		this.domElement.style.boxShadow = `4px 4px 50px #ee6c4d`; //unable to use var(--title) here.
		this.lightOn = true;
	}
	colorOriginal() {
		//changes the color to the color in action
		this.domElement.style.backgroundColor = `var(--main)`;
		this.domElement.style.boxShadow = `4px 4px 50px white`; //unable to use var(--title) here.
		this.lightOn = false;
		userArray[this.id - 1] = '0';
	}
	colorWinner() {
		this.domElement.style.backgroundColor = `var(--winner)`;
		this.domElement.style.boxShadow = `4px 4px 50px green`; //unable to use var(--title) here.
	}
}

class Metronome {
	constructor(id) {
		this.id = id;
		this.positionX = 10 * id + 2;
		this.positionY = 20;
		this.width = 5;
		this.height = 5;
		this.lightOn = false;
		this.domElement = null;

		this.createDomElement();
	}

	createDomElement() {
		// step1: create the element
		this.domElement = document.createElement('div');

		// step2: add content or modify (ex. innerHTML...)
		this.domElement.id = `metronome`;
		this.domElement.style.width = this.width + 'vw';
		this.domElement.style.height = this.height + 'vh';
		this.domElement.style.left = this.positionX + 'vw';
		this.domElement.style.bottom = this.positionY + 'vh';
		//    this.domElement.innerText = `${this.id}`;

		//step3: append to the dom: `parentElm.appendChild()`
		const parentElm = document.getElementById('board');
		parentElm.appendChild(this.domElement);
	}
	colorChange() {
		//changes the color to the color in action
		this.domElement.style.backgroundColor = `var(--title)`;
		this.domElement.style.boxShadow = `4px 4px 50px #ee6c4d`; //unable to use var(--title) here.
	}
	colorOriginal() {
		//changes the color to the color in action
		this.domElement.style.backgroundColor = `var(--secondary)`;
		this.domElement.style.boxShadow = `4px 4px 50px white`; //unable to use var(--title) here.
	}
}

const Key1 = new Button(1);
const Key2 = new Button(2);
const Key3 = new Button(3);
const Key4 = new Button(4);
const Key5 = new Button(5);
const Key6 = new Button(6);
const Key7 = new Button(7);
const Key8 = new Button(8);
const Metro1 = new Metronome(1);
const Metro2 = new Metronome(2);
const Metro3 = new Metronome(3);
const Metro4 = new Metronome(4);
const Metro5 = new Metronome(5);
const Metro6 = new Metronome(6);
const Metro7 = new Metronome(7);
const Metro8 = new Metronome(8);
const metroArray = [
	Metro1,
	Metro2,
	Metro3,
	Metro4,
	Metro5,
	Metro6,
	Metro7,
	Metro8,
];
const keyArray = [Key1, Key2, Key3, Key4, Key5, Key6, Key7, Key8];
let userArray = ['0', '0', '0', '0', '0', '0', '0', '0'];
let solutionArray = ['X', 'X', '0', 'X', 'X', '0', 'X', '0'];
let playerWon = false;

mainClock();
