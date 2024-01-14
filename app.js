console.log('script attached')
const keyLayout = [
"q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
"a", "s", "d", "f", "g", "h", "j", "k", "l",
"z", "x", "c", "v", "b", "n", "m"
]

const main = document.createElement('main');
const sectionCanvas = document.createElement('section');
const sectionGamePad = document.createElement('section');

const guessWordLayout = document.createElement('div');
const hintLayout = document.createElement('div');
const attemptsLayout = document.createElement('div');
const keyBoardLayout = document.createElement('div');
keyBoardLayout.classList.add('flex');

const questions = [
  {question:'пьеса Маяковского',answer:'клоп'},
  {question:'пьеса Маяковского',answer:'клоп'},
]

main.classList.add('flex');
main.classList.add('flex-wrap');

//guess word section

let letterBlockArray =[]

let guessingWord = questions[choosQuestion()].answer
for (let index = 0; index < guessingWord.length; index++) {
  const letterDiv = document.createElement('div');
  letterDiv.classList.add('symbol')
  letterBlockArray.push(letterDiv)
  guessWordLayout.appendChild(letterDiv)

}

guessWordLayout.classList.add('flex');
guessWordLayout.classList.add('justify-content-center');
guessWordLayout.classList.add('gap-1');
guessWordLayout.classList.add('my-3');

sectionGamePad.appendChild(guessWordLayout);

keyLayout.forEach(key=>{

  const btnKey = document.createElement('button');
  btnKey.classList.add('key-button');


  btnKey.setAttribute("type", "button");
  btnKey.textContent = key.toLowerCase();
  keyBoardLayout.appendChild(btnKey);

})

sectionGamePad.appendChild(keyBoardLayout);
main.appendChild(sectionGamePad);
document.body.appendChild(main)

function choosQuestion() {
  return Math.floor(Math.random() * questions.length);
}




