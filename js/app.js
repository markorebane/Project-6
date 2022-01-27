const qwerty = document.getElementById('qwerty');
const wordPhrase = document.getElementById('phrase');
const btnReset = document.getElementsByClassName('btn__reset')[0];
const tries = document.getElementsByClassName('tries');
const letters = document.getElementsByClassName('letter');
const show = document.getElementsByClassName('show');
const overlayScreen = document.getElementById('overlay');
const title = document.querySelector('.title');
const ul = document.querySelector("#phrase ul")

let missedAnswers = 0;
var phrases = [
    'Coding is fun',
    'Javascript is challenging',
    'HTML is basic',
    'CSS tricks',
    'Treehouse friends'
];

//Hides the start screen overlay
btnReset.addEventListener('click', () => { 
    overlayScreen.style.display = 'none'; 
});

//Returns a random phrase from the array 
function getRandomPhraseAsArray(arr) {
    const randomNumber = Math.floor(Math.random() * arr.length);
    return arr[randomNumber].toLowerCase().split('');
}
const randomPhrase = getRandomPhraseAsArray(phrases);

// Adds the letters of a string to the display 
function addPhrasesToDisplay(arr) {
    for (let i = 0; i < arr.length; i++) {
        const li = document.createElement("li");
        li.textContent = arr[i];
        ul.appendChild(li);
        if (arr[i] === ' ') {
            li.classList.add("space");
        } else {
            li.classList.add("letter");
        }
    }
};

addPhrasesToDisplay(randomPhrase);

//Checks if the clicked letter is in the array 
function checkLetter(button) {
    const letters = document.getElementsByClassName('letter');
    let match = null; 
    for (let i = 0; i < letters.length; i++) {
        if (letters[i].textContent === button) {
            letters[i].classList.add("show");
            letters[i].style.transition = '0.6s ease-in-out';
            match = button;
        }  
    }
    return match;
}

//Adds an event listener to the keyboard 
qwerty.addEventListener('click', (e) => { 
    const button = e.target.textContent;
    if (e.target.tagName === 'BUTTON' && e.target.className !== 'chosen') {
        e.target.classList.add('chosen');
        const checkLetterResult = checkLetter(button); 
        if (checkLetterResult == null) {
            missedAnswers++;
            tries[0].firstElementChild.setAttribute('src', 'images/lostHeart.png');
            tries[0].className = 'lost';
            checkWin();
        } else {
            checkWin();
        }
    }
});

//Checks if the player has won
function checkWin() {
    if (letters.length === show.length) {
        overlayScreen.className = 'win'; 
        title.textContent = "You have won!";
        overlayScreen.style.display = 'flex';
        btnReset.textContent = "Restart the game"
        restart();
    } else if (missedAnswers >= 5) {
        overlayScreen.className = 'lose'; 
        title.textContent = "Sorry, you are out of lives!";
        overlayScreen.style.display = 'flex';
        btnReset.textContent = "Restart the game";
        restart();
    }

}

//Restarts the game

function restart() {
    missedAnswers = 0;
    ul.innerHTML = '';
    const selectedButtons = document.querySelectorAll('.chosen');
    for(let i = 0; i < selectedButtons.length; i++) {
      selectedButtons[i].classList.remove('chosen');
    }
    const newPhrase = getRandomPhraseAsArray(phrases);
    addPhrasesToDisplay(newPhrase);

    const lostHearts = document.getElementsByClassName('lost');
    for (i = 0; i < lostHearts.length; i + 0) {
        lostHearts[i].firstElementChild.setAttribute('src', 'images/liveHeart.png');
        lostHearts[i].className = 'tries';
    }
}