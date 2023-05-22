let counter = 0;

function mainClock() {
	let update = setInterval(() => {
		if (counter < 9) {
			console.log(counter);
			counter++;
			if (counter === 8) {
				counter = 0;
			}
		}
	}, 60000 / 110);
}

class Button {
	constructor(id) {
		this.id = id;
		this.positionX = 10 * id;
		this.positionY = 30;
		this.width = 9;
		this.height = 30;
		this.lightOn = false;
		this.domElement = null;

		this.createDomElement();
	}

	createDomElement() {
		this.domElement = document.createElement('div');
		this.domElement.id = 'button';
		this.domElement.style.width = this.width + 'vw';
		this.domElement.style.height = this.height + 'vh';
		this.domElement.style.left = this.positionX + 'vw';
		this.domElement.style.bottom = this.positionY + 'vh';
		// this.domElement.innerText = `${this.id}`;

		const parentElm = document.getElementById('board');
		parentElm.appendChild(this.domElement);
		this.domElement.addEventListener('click', () => {
			console.log('i was here');
			if (this.lightOn === true) {
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
	}
	colorOriginal() {
		//changes the color to the color in action
		this.domElement.style.backgroundColor = `var(--main)`;
		this.domElement.style.boxShadow = `4px 4px 50px white`; //unable to use var(--title) here.
		this.lightOn = false;
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

mainClock();
