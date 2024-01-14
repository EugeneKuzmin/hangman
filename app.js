console.log('script attached')
const keyLayout = [
"q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
"a", "s", "d", "f", "g", "h", "j", "k", "l",
"z", "x", "c", "v", "b", "n", "m"
]

let main = document.createElement('main');
let sectionCanvas = document.createElement('section');
let sectionGamePad = document.createElement('section');

let guessWordLayout = document.createElement('div');
let hintLayout = document.createElement('div');
let attemptsLayout = document.createElement('div');
let keyBoardLayout = document.createElement('div');
keyBoardLayout.classList.add('flex');





main.classList.add('flex');
main.classList.add('flex-wrap');

keyLayout.forEach(key=>{

  let btnKey = document.createElement('button');
  btnKey.classList.add('key-button');


  btnKey.setAttribute("type", "button");
  btnKey.textContent = key.toLowerCase();
  keyBoardLayout.appendChild(btnKey);

})
sectionGamePad.appendChild(keyBoardLayout);
main.appendChild(sectionGamePad);
document.body.appendChild(main)
