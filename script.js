window.onload = function() {
  //create board
  var board = document.getElementById('board');
  var boardsize = 18;
  var boardImages = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9'
  ];

  function createCards(size) {
    for (var i = 0; i < size; i++) {
      var card = document.createElement('div');
      card.setAttribute('class', 'card');
      //pick the picture it is
      var randomImageIndex = getRandomInt(0, boardImages.length - 1);
      card.innerText = boardImages[randomImageIndex];
      boardImages.splice(randomImageIndex, 1);

      card.style.backgroundImage = "url('img/0.jpg')";

      board.appendChild(card);
    }
  }

  createCards(boardsize);

  //create score
  var score = document.getElementById('score');
  score.innerText = 0;

  //create timerArray
  var timerArray = [];

  //when user opens a card:
  board.addEventListener('click', function(event) {
    if (event.target.className == 'card') {
      //make sure only 2 can be opened at once
      var currentFlipped = document.querySelectorAll('.flipping');

      if (currentFlipped.length > 1) {
        for (var i = 0; i < currentFlipped.length; i++) {
          currentFlipped[i].style.backgroundImage = "url('img/0.jpg')";
          currentFlipped[i].setAttribute('class', 'card');
        }
      }
      //mark it as 'flipping' via class, and show the secret image
      event.target.setAttribute('class', 'flipping card');
      event.target.style.backgroundImage =
        "url('img/" + event.target.innerText + '.jpg';
      //increase the score count every time a card successfully flips
      score.innerText++;

      var currentFlipped = document.querySelectorAll('.flipping');
      if (currentFlipped.length == 2) {
        if (currentFlipped[0].innerText == currentFlipped[1].innerText) {
          //if two cards have the same secret value (innerText)
          while (timerArray.length > 0) {
            clearTimeout(timerArray[0]);
          }

          currentFlipped[0].style.backgroundImage =
            "url('img/" + event.target.innerText + '.jpg';
          currentFlipped[0].setAttribute('class', 'completed card');

          currentFlipped[1].style.backgroundImage =
            "url('img/" + event.target.innerText + '.jpg';
          currentFlipped[1].setAttribute('class', 'completed card');
        } else {
          //reset the card after two seconds
          var timerId = setTimeout(function() {
            event.target.style.backgroundImage = "url('img/0.jpg')";
            event.target.setAttribute('class', 'card');
          }, 2000);
          timerArray.push(timerId);
          console.log('incorrect card');
          console.log(timerArray);
        }
      } else {
        //reset the card after two seconds
        var timerId = setTimeout(function() {
          event.target.style.backgroundImage = "url('img/0.jpg')";
          event.target.setAttribute('class', 'card');
        }, 2000);
        console.log('first click timer started');
      }
    }
  });

  //used for board creation
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }
};
