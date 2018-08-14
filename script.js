window.onload = function() {
  //board size indicates how many tiles there are
  var boardsize = 10;

  //create new game button
  var newGameButton = document.getElementById('newGameButton');

  //create timers Array
  var timersArr = [];

  //show previous high score
  var highScoreText = document.getElementById('highScore');
  var highestStored = localStorage.getItem('highScoreNum');
  if (highestStored !== null) {
    highScoreText.innerText = 'High score: ' + highestStored;
  }

  //create a new board when user hits New Game
  newGameButton.addEventListener('click', function(event) {
    boardImages = ['1', '2', '3', '4', '5', '1', '2', '3', '4', '5'];
    var board = document.getElementById('board');
    //clear any board that may have been abandoned
    while (board.firstChild) {
      board.removeChild(board.firstChild);
    }
    createCards(boardsize);

    //create score
    var score = document.getElementById('score');
    score.innerText = 0;
  });

  function createCards(size) {
    for (var i = 0; i < size; i++) {
      //create scene
      var scene = document.createElement('div');
      scene.setAttribute('class', 'scene scene--card');

      //create card container
      var card = document.createElement('div');
      card.setAttribute('class', 'card');
      scene.appendChild(card);

      //create front of card
      var front = document.createElement('div');
      front.setAttribute('class', 'card__face card__face--front');
      front.style.backgroundImage = "url('img/0.jpg')";
      card.appendChild(front);

      //create back of card
      var back = document.createElement('div');
      back.setAttribute('class', 'card__face card__face--back');
      //pick the picture randomly
      var randomImageIndex = getRandomInt(0, boardImages.length - 1);
      back.innerText = boardImages[randomImageIndex];

      boardImages.splice(randomImageIndex, 1);
      back.style.backgroundImage = "url('img/" + back.innerText + '.jpg';
      card.appendChild(back);

      board.appendChild(scene);
    }
  }

  //when user opens a card on the board
  board.addEventListener('click', function(event) {
    // if the card is incomplete (card) or flipped, then switch it to the other position
    if (
      event.target.parentElement.classList == 'card' ||
      event.target.parentElement.classList == 'card is-flipped'
    ) {
      event.target.parentElement.classList.toggle('is-flipped');
    }

    //make sure only 2 can be opened at once
    var currentFlipped = document.querySelectorAll('.is-flipped');
    if (currentFlipped.length > 2) {
      //close all cards if the user attempts to open a third
      for (var i = 0; i < currentFlipped.length; i++) {
        currentFlipped[i].setAttribute('class', 'card');
      }
    }

    //increase the score every time a user clicks a card (that is not flipped or completed)
    if (event.target.parentElement.classList == 'card is-flipped') {
      score.innerText++;
    }

    //if two cards have the same secret value (innerText)`, mark as complete
    if (currentFlipped.length == 2) {
      if (currentFlipped[0].innerText == currentFlipped[1].innerText) {
        currentFlipped[0].setAttribute('class', 'card completed');
        currentFlipped[1].setAttribute('class', 'card completed');
      }
      //if all cards are completed:
      var completedCards = document.querySelectorAll('.completed');
      if (completedCards.length == boardsize) {
        //create high score
        if (
          highestStored == null ||
          parseInt(highestStored) > parseInt(score.innerText)
        ) {
          localStorage.setItem('highScoreNum', score.innerText);
          highScoreText.innerText = 'High score: ' + score.innerText;
        }

        //show congrats!
        score.innerText = 'Your score is: ' + score.innerText + '!';
      }
    }

    //clear previous timers (if there's a new click)
    for (var l = 0; l < timersArr.length; l++) {
      clearTimeout(timersArr[l]);
    }

    //after two seconds, flip back any cards that are still marked as flipped
    var timerID = setTimeout(function() {
      var timeoutFlips = document.querySelectorAll('.is-flipped');
      for (var k = 0; k < timeoutFlips.length; k++) {
        timeoutFlips[k].setAttribute('class', 'card');
      }
    }, 2000);
    timersArr.push(timerID);
  });

  //used for board creation
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }
};
