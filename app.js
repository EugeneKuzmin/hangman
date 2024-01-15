console.log('script attached')
const keyLayout = [
"q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
"a", "s", "d", "f", "g", "h", "j", "k", "l",
"z", "x", "c", "v", "b", "n", "m"
]

const main = document.createElement('main');
main.classList.add('flex')
const sectionGamePad = document.createElement('section');

const guessWordLayout = document.createElement('div');

const keyBoardLayout = document.createElement('div');

//section picture
const sectionCanvas = document.createElement('section');
const hangmanPic = document.createElement('img');
hangmanPic.src = './src/1.png';
hangmanPic.alt = 'gallows';
sectionCanvas.appendChild(hangmanPic)

keyBoardLayout.classList.add('flex');
keyBoardLayout.classList.add('flex-wrap');

const questions = [
  {question:'пьеса Маяковского',answer:'klop'},
  {question:'пьеса Маяковского',answer:'klop'},
]

main.classList.add('flex');

//guess word section

let letterBlockArray =[]

const questionElement = questions[choosQuestion()]

let guessingWord = questionElement.answer
let question = questionElement.question

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
      if(fallCounter === 7){
        modalContent.innerText = `You lost(. The right answer is ${guessingWord}`
        modal.showModal();


      }else{
        hangmanPic.src = `./src/${fallCounter}.png`;
        attemptsLayout.innerText = `Осталось неправильных попыток  ${fallCounter} из 6`
      }
    }else{
      letterBlockArray[letterIndx].innerText = key.toLocaleUpperCase()
    }
    
  })
  
  keyBoardLayout.appendChild(btnKey);
  
})

// hint section
const hintLayout = document.createElement('div');
hintLayout.classList.add('flex');
hintLayout.classList.add('justify-content-center');
hintLayout.classList.add('my-3');
hintLayout.innerText = `Вопрос: ${question}`;
sectionGamePad.appendChild(hintLayout);

//attempts 
const attemptsLayout = document.createElement('div');
attemptsLayout.innerText = `Осталось неправильных попыток  ${fallCounter} из 6`
sectionGamePad.appendChild(attemptsLayout);

//modal
const modal = document.createElement('dialog');
const modalContent = document.createElement('div');
modalContent.classList.add('p-4');
const modalClose = document.createElement('button')
modalClose.classList.add('close-button');
modalClose.innerText = 'Close'
modal.appendChild(modalContent);
modal.appendChild(modalClose);
modalClose.addEventListener('click',() => {
  modal.close();
})
document.body.appendChild(modal)

sectionGamePad.appendChild(keyBoardLayout);

main.appendChild(sectionCanvas);
main.appendChild(sectionGamePad);
document.body.appendChild(main)

function choosQuestion() {
  return Math.floor(Math.random() * questions.length);
}




