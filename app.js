console.log('script attached')
const keyLayout = [
"q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
"a", "s", "d", "f", "g", "h", "j", "k", "l",
"z", "x", "c", "v", "b", "n", "m"
]

const main = document.createElement('main');
main.classList.add('flex')
const sectionCanvas = document.createElement('section');
const sectionGamePad = document.createElement('section');

const guessWordLayout = document.createElement('div');
const hintLayout = document.createElement('div');
const attemptsLayout = document.createElement('div');
const keyBoardLayout = document.createElement('div');

//sectionCanvas
const hangmanPic = document.createElement('img');
hangmanPic.src = './src/1.png';
hangmanPic.alt = '1';
sectionCanvas.appendChild(hangmanPic)

keyBoardLayout.classList.add('flex');
keyBoardLayout.classList.add('flex-wrap');

const questions = [
  {question:'пьеса Маяковского',answer:'клоп'},
  {question:'пьеса Маяковского',answer:'клоп'},
]

main.classList.add('flex');

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

let fallCounter = 0



keyLayout.forEach(key=>{

  const btnKey = document.createElement('button');
  btnKey.classList.add('key-button');


  btnKey.setAttribute("type", "button");
  btnKey.textContent = key;
  btnKey.addEventListener('click',() => {
    const letterIndx = guessingWord.indexOf(key)
    if(letterIndx === -1){
      fallCounter += 1
      hangmanPic.src = `./src/${fallCounter}.png`;
    }else{
      letterBlockArray[letterIndx].textContent = key.toLocaleUpperCase()
    }

  })

  keyBoardLayout.appendChild(btnKey);

})

sectionGamePad.appendChild(keyBoardLayout);

main.appendChild(sectionCanvas);
main.appendChild(sectionGamePad);
document.body.appendChild(main)

function choosQuestion() {
  return Math.floor(Math.random() * questions.length);
}




