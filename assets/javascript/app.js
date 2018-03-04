function playTriviaGame() {

  // An array of objects that defines list of questions, their answer choices, and correct answers 
  const qaArray = [
    {
      "question": "When were the first Winter Olympic games held?",
      "answers": ["1924", "1896", "1948", "2002"],
      "correctAnswer": "1924"
    },
    {
      "question": "How many countries were represented by athletes in PyeongChang?",
      "answers": ["72", "57", "105", "92"],
      "correctAnswer": "92"
    },
    {
      "question": "How much is a single gold medal worth (USD)?",
      "answers": ["$1,038", "$178", "$570", "$412"],
      "correctAnswer": "$570"
    },
    {
      "question": "Which country has won the most gold medals at the Winter Games since they began?",
      "answers": ["United States", "Norway", "Germany", "France"],
      "correctAnswer": "Norway"
    },
    {
      "question": "How high are the walls of the halfpipe for the Halfpipe Snowboarding event?",
      "answers": ["13 feet", "22 feet", "31 feet", "46 feet"],
      "correctAnswer": "22 feet"
    },
    {
      "question": "Which American city has hosted the Winter Olympics twice?",
      "answers": ["Salt Lake City", "Lake Placid", "Los Angeles", "Atlanta"],
      "correctAnswer": "Lake Placid"
    },
    {
      "question": "Which of these is not an indoor sport at the Winter Olympics?",
      "answers": ["Curling", "Speed Skating", "Hockey", "Skeleton"],
      "correctAnswer": "Skeleton"
    },
    {
      "question": "Who was the youngest individual Olympic champion at the Winter Games?",
      "answers": ["Tara Lipinski", "Red Gerard", "Toni Nieminen", "Chloe Kim"],
      "correctAnswer": "Tara Lipinski"
    },
    {
      "question": "When did North Korea start competing in the Winter Olympics?",
      "answers": ["1892", "1936", "2018", "1964"],
      "correctAnswer": "1964"
    },
    {
      "question": "Which of these winter sports originally debuted in the Summer Olympics?",
      "answers": ["Figure Skating", "Curling", "Hockey", "Luge"],
      "correctAnswer": "Figure Skating"
    },
  ];

  // The questionIndex is used to access the array throughout the game
  let questionIndex = 0;
  // The standard number for the timer used in the game
  let timerNumber = 20;
  let winCount = 0;
  let lossCount = 0;
  // Variable to hold the timer's interval functionality
  let intervalID;

  // Call stageGame function to prepare for game
  stageGame();

  // Adds on-click event for all answer buttons to check for correct answer, display correct/incorrect, and display next question
  $("#btn-1").on('click', checkChosenAnswer);
  $("#btn-2").on('click', checkChosenAnswer);
  $("#btn-3").on('click', checkChosenAnswer);
  $("#btn-4").on('click', checkChosenAnswer);

  // On begin button click - asks trivia question
  $("#begin-button").on('click', askQuestion);

  // ================================
  // Setup & Start functions
  // ================================

  // Shows/hides elements to set stage for trivia game
  function stageGame() {
    $("#restart-button").hide();
    $("#welcome-statement").show();
    $("#begin-button").show();
    $("#question").hide();
    $("#results").hide();
  }

  // Hides and shows elements, starts timer, and displays question
  function askQuestion() {
    $("#results").hide();
    $("#restart-button").hide();
    $("#welcome-statement").hide();
    $("#begin-button").hide();
    $("#timer").text("Timer: 20s");
    timerNumber = 20;
    runTimer();
    $("#question").show();
    $("#timer").show();
    $("#btn-1").show();
    $("#btn-2").show();
    $("#btn-3").show();
    $("#btn-4").show();
    displayQuestion();
  }



  // ================================
  // Timer functions
  // ================================

  // Starts timer, and executes code if timer goes to 0
  function runTimer() {
    intervalID = setInterval(function () {
      timerNumber--;
      $("#timer").text("Timer: " + timerNumber + "s");
      if (timerNumber === 0) {
        stopTimer();
        $(".btn").hide();
        $("#question").text("Time's up! Moving on to the next question...");
        questionIndex++;
        lossCount++;
        setTimeout(askQuestion, 4000);
      }
    }, 1000);

  }

  // Clears timer interval function
  function stopTimer() {
    clearInterval(intervalID);
  }

  // Clears timer interval and resets timerNumber
  function resetTimer() {
    clearInterval(intervalID);
    timerNumber = 20;
  }

  // ================================
  // Question & Answer functions
  // ================================

  // Hides buttons and timer, checks clicked answer against the correct answer for the question, and asks next question after timeout
  function checkChosenAnswer() {
    $(".btn").hide();
    $("#timer").hide();
    stopTimer();
    if ($(this).text() === qaArray[questionIndex].correctAnswer) {
      winCount++;
      $("#question").text("Correct!");
    } else {
      lossCount++;
      $("#question").text("Incorrect!");
      $("#results").text("The right answer was: " + qaArray[questionIndex].correctAnswer);
      $("#results").show();
    }
    questionIndex++;
    setTimeout(askQuestion, 4000);
  }

  // Displays the next question by filling in elements on DOM. Also checks for the end of the game using questionIndex, and displays last screen if the game is over
  function displayQuestion() {
    if (questionIndex === qaArray.length) {
      stopTimer();
      displayWinLossScreen();
    } else {
      $("#btn-1").text(qaArray[questionIndex].answers[0]);
      $("#btn-2").text(qaArray[questionIndex].answers[1]);
      $("#btn-3").text(qaArray[questionIndex].answers[2]);
      $("#btn-4").text(qaArray[questionIndex].answers[3]);
      $("#question").text(qaArray[questionIndex].question);
    }
  }

  // Displays final screen at the end of the game. Shows wins, and allows user to restart game
  function displayWinLossScreen() {
    $(".btn").hide();
    $("#timer").hide();
    $("#question").text("That's all folks! Your score is...");
    $("#results").text(winCount + "/" + qaArray.length);
    $("#results").show();
    $("#restart-button").on('click', playTriviaGame);
    $("#restart-button").show();
    questionIndex = 0;
  }

}