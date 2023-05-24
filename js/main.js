let counter = 0;
let bpm = 360;
let level = 0;
let intro = true;
let introCounter = 0;
let playerWon = false;
let hearSamples = true;
let greenButtonCounter = 0;

//clock for the whole game
function mainClock() {
	let update = setInterval(() => {
		if (counter < 9) {
			seqTrigger();
		}
		// metroSample();
		counter++;
		if (counter === 8) {
			counter = 0;
		}
	}, 60000 / bpm);
}

//starts the game and sets the board

//game main level sequencer
function seqTrigger() {
	if (intro == true) {
		introMode();
	} else {
		gameLevel();
	}
	userSample();
	metroLights();
}

//game level

function gameLevel() {
	introCounter = 0;
	if (counter < 8 && counter !== 0) {
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
		if (userArray[7] === 'X' && !playerWon) {
			keyArray[7].colorChange();
		}
		if (userArray.toString() === gameLevels[level].solution.toString()) {
			playerWon = true;
		}
	}
	if (counter === 0) {
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
	if (greenButtonCounter > 16) {
		intro = true;
		level++;
		userArray = ['0', '0', '0', '0', '0', '0', '0', '0'];
		gameReset();
	}
}
//metronome lights
function metroLights() {
	if (counter < 8 && counter !== 0) {
		metroArray[counter].colorChange(); //color change on the metronome line
		metroArray[counter - 1].colorOriginal();
	}
	if (counter < 8 && counter !== 0) {
		metroArray[counter].colorChange(); //color change on the metronome line
		metroArray[counter - 1].colorOriginal();
	}
	if (counter == 0) {
		metroArray[7].colorOriginal();
	}
}
//click, click, it's the sound of the metronome.
function metroSample() {
	soundStr = `/sounds/click.wav`;
	sound = new Audio(soundStr);
	sound.play();
}

//plays the intro color
function levelIntro() {
	if ((intro = true)) {
		keyArray[introCounter].colorIntro();
	}
}
//intro color animation
function introMode() {
	greenButtonCounter = 0;

	metroLights();
	if (intro === true) {
		if (counter === 7 && introCounter < 8) {
			levelIntro();
			introCounter++;
		}
		if (introCounter === 8) {
			introCounter++;
		}
		if (introCounter === 9) {
			gameReset();
			intro = false;
		}
	}
}
//resets the buttons to their original position
function gameReset() {
	for (let i = 0; i <= 7; i++) {
		keyArray[i].colorOriginal();
	}
}
//plays the level solution so the player can play it

//plays sample in a bar
function userSample() {
	for (i = 0; i <= level; i++) {
		if ((intro == true) & (gameLevels[i].solution[counter] == 'X')) {
			samplePipeline(i);
		}
		if (intro == false && i < level && gameLevels[i].solution[counter] == 'X') {
			samplePipeline(i);
		}
		if (intro == false && i === level && userArray[counter] == 'X') {
			// soundStr = gameLevels[level].sample[counter]; //samples change from level to level and space in the index
			// sound = new Audio(soundStr);
			// sound.play();
			samplePipeline(i);
		}
	}
}
//pipeline that allows multiple samples playing at same time
function samplePipeline(soundVar) {
	switch (soundVar) {
		case 0:
			var snd1 = new Audio();
			var src1 = document.createElement('source');
			src1.type = 'audio/mpeg';
			src1.src = gameLevels[0].sample[counter];
			snd1.appendChild(src1);
			snd1.play();
			break;

		case 1:
			var snd2 = new Audio();
			var src2 = document.createElement('source');
			src2.type = 'audio/mpeg';
			src2.src = gameLevels[1].sample[counter];
			snd2.appendChild(src2);
			snd2.play();
			break;

		case 2:
			var snd3 = new Audio();
			var src3 = document.createElement('source');
			src3.type = 'audio/mpeg';
			src3.src = gameLevels[2].sample[counter];
			snd3.appendChild(src3);
			snd3.play();
			break;

		case 3:
			var snd4 = new Audio();
			var src4 = document.createElement('source');
			src4.type = 'audio/mpeg';
			src4.src = gameLevels[3].sample[counter];
			snd4.appendChild(src4);
			snd4.play();
			break;
	}
}

const gameLevels = [
	{
		level: 1,
		description: "Let's start with a sample!",
		sample: [
			'/sounds/stab1.mp3',
			'/sounds/stabX.mp3',
			'/sounds/stab1.mp3',
			'/sounds/stab2.mp3',
			'/sounds/stab2.mp3',
			'/sounds/stab1.mp3',
			'/sounds/stab3.mp3',
			'/sounds/stab4.mp3',
		],
		solution: ['X', '0', 'X', 'X', 'X', 'X', 'X', 'X'],
		soundOn: false,
	},
	{
		level: 2,
		description: 'Time to hit that bass!',
		sample: [
			'/sounds/bass1.mp3',
			'/sounds/bass1.mp3',
			'/sounds/bassX.mp3',
			'/sounds/bass1.mp3',
			'/sounds/bass2.mp3',
			'/sounds/bass2.mp3',
			'/sounds/bassX.mp3',
			'/sounds/bassX.mp3',
		],
		solution: ['X', 'X', '0', 'X', 'X', 'X', '0', '0'],
		soundOn: false,
	},
	{
		level: 3,
		description: 'Kick it!',
		sample: [
			'/sounds/kick.mp3',
			'/sounds/kick.mp3',
			'/sounds/kickX.mp3',
			'/sounds/kick.mp3',
			'/sounds/kickX.mp3',
			'/sounds/kickX.mp3',
			'/sounds/kick.mp3',
			'/sounds/kickX.mp3',
		],
		solution: ['X', 'X', '0', 'X', '0', '0', 'X', '0'],
		soundOn: false,
	},
	{
		level: 4,
		description: 'What about the snare?',
		sample: [
			'/sounds/snareX.mp3',
			'/sounds/snareX.mp3',
			'/sounds/snare.mp3',
			'/sounds/snareX.mp3',
			'/sounds/snareX.mp3',
			'/sounds/snare.mp3',
			'/sounds/snareX.mp3',
			'/sounds/snareX.mp3',
		],
		solution: ['0', '0', 'X', '0', '0', 'X', '0', '0'],
		soundOn: false,
	},
];

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
		greenButtonCounter++;
		console.log(greenButtonCounter);
	}
	colorIntro() {
		this.domElement.style.backgroundColor = `var(--title`;
		this.domElement.style.boxShadow = `4px 4px 50px red`; //unable to use var(--title) here.
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

class StartButton {
	constructor(id) {
		this.id = id;
		this.positionX = 0;
		this.positionY = 0;
		this.width = 100;
		this.height = 100;
		this.lightOn = false;
		this.domElement = null;

		this.createDomElement();
	}

	createDomElement() {
		// step1: create the element
		this.domElement = document.createElement('div');

		// step2: add content or modify (ex. innerHTML...)
		this.domElement.id = `start-button`;
		this.domElement.style.width = this.width + 'vw';
		this.domElement.style.height = this.height + 'vh';
		this.domElement.style.left = this.positionX + 'vw';
		this.domElement.style.bottom = this.positionY + 'vh';
		this.domElement.innerHTML = `<p>Welcome to Metronome.</p> <p>Click to start the beat.</p>`;

		//step3: append to the dom: `parentElm.appendChild()`
		const parentElm = document.getElementById('board');
		parentElm.appendChild(this.domElement);
		this.domElement.addEventListener('click', () => {
			parentElm.removeChild(this.domElement);
			mainClock();
		});
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
const play = new StartButton();
