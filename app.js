const keyLayout = [
"q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
"a", "s", "d", "f", "g", "h", "j", "k", "l",
"z", "x", "c", "v", "b", "n", "m"
]

const questions = [
  {question:"What is the main ingredient in guacamole?",answer:"avocado"},
  {question:"What is the largest mammal on Earth?",answer:"whale"},
  {question:"What is the capital of Uganda?",answer:"kampala"},
  {question:"What is the capital of Republic of Cameroon?",answer:"yaounde"},
  {question:"In which sport would you perform a slam dunk?",answer:"basketball"},
  {question:"In Lewis Carroll's 'Alice's Adventures in Wonderland,' what is the one-word name of the grinning cat?",answer:"cheshire"},
  {question:"What is the term for a program or set of instructions that performs a specific task on a computer?",answer:"algorithm"},
  {question:"What is the term for a malicious software that disrupts computer operations?",answer:"virus"},
  {question:"The tallest waterfall in the world.",answer:"angel"},
  {question:"Meat is pickled in the juice of which fruit for the dish of Pudding and souse?",answer:"lime"},
]

let letterBlockArray =[];
let guessingWord = '';
let guessingWordSource = '';
let question = '';
let prevQuestion = '';
let fallCounter = 0;
let questionsOver = [];

const init = () => {
  let questionElement = 0;
  let leftQ = [...Array(10).keys()].filter(x=>!questionsOver.includes(x))

  if(leftQ.length === 0){
    questionsOver = []
    questionsOver.push(prevQuestion)
    leftQ = [...Array(10).keys()].filter(x=>!questionsOver.includes(x))
  }

  if(leftQ.length === 1){
    questionElement = questions[leftQ[0]]
    questionsOver.push(leftQ[0]);
    prevQuestion = leftQ[0]
  }else{
    const selectedQuestion = choosQuestion(leftQ.length);
    questionsOver.push(leftQ[selectedQuestion]);
    questionElement = questions[leftQ[selectedQuestion]]
  }

  guessingWord = questionElement.answer;
  guessingWordSource = questionElement.answer;
  question = questionElement.question;

  hangmanPic.src = './src/1.png';

  fallCounter = 0;

  hintLayout.innerText = `Question: ${question}`;
  attemptsLayout.innerText = `Attempts ${fallCounter} / 6`;

  letterBlockArray =[];
  guessWordLayout.innerHTML = '';

  for (let index = 0; index < guessingWord.length; index++) {
    const letterDiv = document.createElement('div');
    letterDiv.classList.add('symbol')
    letterBlockArray.push(letterDiv)
    guessWordLayout.appendChild(letterDiv)
  }

  keyBoardLayout.innerHTML = '';
  let keyBoardRow = document.createElement('div');
  keyBoardRow.classList.add('flex');
  keyBoardRow.classList.add('justify-content-center');

  keyLayout.forEach((key,i)=>{
    const btnKey = document.createElement('button');
    btnKey.classList.add('key-button');
    btnKey.setAttribute("type", "button");
    btnKey.textContent = key;
    btnKey.addEventListener('click',(e) => {
      keyPressProcessing(key);
      e.target.classList.add('typed');
      e.target.disabled = true;
    })
    keyBoardRow.appendChild(btnKey);

    if(i % 9 === 0&&i !==0){
      keyBoardLayout.appendChild(keyBoardRow);
      keyBoardRow = document.createElement('div');
      keyBoardRow.classList.add('flex');
      keyBoardRow.classList.add('justify-content-center');
    }
  })
  keyBoardLayout.appendChild(keyBoardRow);
  document.addEventListener('keyup',keyPress);

}

//************ key click precessing ************//

const keyPressProcessing = (key) => {

  let letterIndx = guessingWord.indexOf(key)
      if(letterIndx === -1){
        fallCounter += 1;
        hangmanPic.src = `./src/${fallCounter+1}.png`;
        attemptsLayout.innerText = `Attempts ${fallCounter} / 6`;
        if(fallCounter === 6){
          modalContent.innerText = `You lost(. The right answer is ${guessingWordSource}`;
          document.removeEventListener('keyup',keyPress);
          modal.showModal();
        }
      }else{
        while (letterIndx !== -1) {
          letterBlockArray[letterIndx].innerText = key.toUpperCase()
          letterBlockArray[letterIndx].classList.add('guessed')

          guessingWord = guessingWord.replace(key,'$')
          letterIndx = guessingWord.indexOf(key)
        }
        if(guessingWord.split('').filter(x=>x==='$').length === guessingWord.length){
          modalContent.innerText = `Congrats!!! You win! The right answer is ${guessingWordSource}`
          document.removeEventListener('keyup',keyPress);
          modal.showModal();
        }
      }

}

// ********** choose Q randome**********//

const choosQuestion = (amountOfQuestions) => {
  return Math.floor(Math.random() * amountOfQuestions);
}

//************ main layout ************//


const main = document.createElement('main');
main.classList.add('flex')
main.classList.add('flex-wrap')
main.classList.add('main-font')

const sectionGamePad = document.createElement('section');
sectionGamePad.classList.add('max-width-35');
sectionGamePad.classList.add('flex');
sectionGamePad.classList.add('flex-1');
sectionGamePad.classList.add('flex-column');
sectionGamePad.classList.add('align-items-center');


//************picture section************//

const sectionCanvas = document.createElement('section');
sectionCanvas.classList.add('flex');
sectionCanvas.classList.add('flex-1');
sectionCanvas.classList.add('justify-content-center');
const hangmanPic = document.createElement('img');

hangmanPic.alt = 'gallows';
sectionCanvas.appendChild(hangmanPic)


//************guess word section************//

const guessWordLayout = document.createElement('div');
guessWordLayout.classList.add('flex');
guessWordLayout.classList.add('justify-content-center');
guessWordLayout.classList.add('gap-1');
guessWordLayout.classList.add('my-3');
guessWordLayout.classList.add('mt-6');

sectionGamePad.appendChild(guessWordLayout);


//************hint section************//

const hintLayout = document.createElement('div');
hintLayout.classList.add('flex');
hintLayout.classList.add('justify-content-center');
hintLayout.classList.add('my-3');
hintLayout.classList.add('mx-2');

sectionGamePad.appendChild(hintLayout);


//************attempts info section************//

const attemptsLayout = document.createElement('div');
attemptsLayout.classList.add('my-3');
attemptsLayout.innerText = `Attempts  ${fallCounter} / 6`
sectionGamePad.appendChild(attemptsLayout);


//************keyboard section************//

const keyBoardLayout = document.createElement('div');
keyBoardLayout.classList.add('mx-2')

const keyPress = (e) => {
  if(keyLayout.includes(e.key.toLowerCase())){
    const btnKey = keyBoardLayout.querySelectorAll('.key-button')[keyLayout.indexOf(e.key.toLowerCase())];
    if(!btnKey.disabled){
      keyPressProcessing(e.key);
      btnKey.classList.add('typed');
      btnKey.disabled = true;
    }
  }
}

sectionGamePad.appendChild(keyBoardLayout);

//************modal section************//

const modal = document.createElement('dialog');
const modalContent = document.createElement('div');
modalContent.classList.add('p-4');
const modalFooter = document.createElement('div');
modalFooter.classList.add('flex');
modalFooter.classList.add('justify-content-center');
const modalClose = document.createElement('button');
modalClose.classList.add('close-button');
modalClose.innerText = 'Play again!'
modalFooter.appendChild(modalClose);
modal.appendChild(modalContent);
modal.appendChild(modalFooter);
modalClose.addEventListener('click',() => {
  init();
  modal.close();
})
document.body.appendChild(modal)


//******initialization***********/

main.appendChild(sectionCanvas);
main.appendChild(sectionGamePad);
document.body.appendChild(main)

init();