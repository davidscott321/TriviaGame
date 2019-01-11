$(document).ready(function()
{
  $(".image").html("<img src='assets/images/start.jpg'>");
  $(".timer").hide();
  $(".answers").hide();
  $(".scoreboard").hide();
  // event listeners
  $(".startButton").on('click',startGame);
});

var questionCount;
var timeout;
var unanswered;
var incorrect;
var correct;
var answer;
var timerCount;
var timer;
var timeLeft;

var questions = ["Which movie includes the line 'What are you telling me? That I can dodge bullets?'",
"2001: A Space Odyssey is a classic written by Stanley Kubrick and which other sci-fi giant?",
"'In space, no one can hear you scream' is the tagline for which classic film starring Sigourney Weaver?",
"This movie was set in a post-apocalyptic Outback. What is it?",
"What book was the movie Bladerunner based on?",
"What is the license plate of the DeLorean in the Back to the Future films?",
"Star Wars is one of the most epic sci-fi series of all times. Name the planet that Leia grew up on.",
"In The Hitchhiker's Guide to the Galaxy, what might you call someone who knows where his towel is?",
"In E.T. what Halloween costume does the titular character wear?",
"What is the name of the fifth element in The Fifth Element?"
];

var options = [["Timecrimes","Inception","The Matrix","Memento"],["John Scalzi","Isaac Asimov","Philip K. Dick","Arthur C. Clarke"],["Galaxy Quest","Alien","Avatar","Event Horizon"],["Mad Max","The Road","Children of Men","The Book of Eli"],["The Man in the High Castle","Do Androids Dream of Electric Sheep?","Ubik","The Three Stigmata of Palmer Eldritch"],["Outatime","GoFuture","1Forward","88timego"],["Dagoba","Hoth","Alderaan","Tatooine"],["A zaphod beeblebrox","A dolphin","A zarkin frood","A pan galactic gargle blaster"],["A ghost","A witch","A pumpkin","A pirate"],["Adamantine","Leeloo","Chronoton","Dilithium"]];

var answers = [2,3,1,0,1,0,2,2,0,1];

var images = ["assets/images/1.jpg","assets/images/2.jpg","assets/images/3.jpg","assets/images/4.jpg","assets/images/5.jpg","assets/images/6.jpg","assets/images/7.jpg","assets/images/8.jpg","assets/images/9.jpg","assets/images/10.jpg"];

var answerImages = ["assets/images/unanswered.jpg","assets/images/correct.png","assets/images/incorrect.png"];

function startGame() 
{
  questionCount = 0;
  unanswered = 0;
  incorrect = 0;
  correct = 0;
  $(".playAgain").hide();
  $(".timer").hide();
  $(".choices").hide();
  $(".startButton").hide();
  askQuestion();
}

function askQuestion() 
{
  timeLeft = 10;
  answer = options[questionCount][answers[questionCount]];

  $(".timer").show();
  $(".remainingTime").html(timeLeft);
  $(".image").show();
  $(".image").html("<img src="+images[questionCount]+">");
  $(".image").append("<br><br>");
  $(".choices").show();
  $(".scoreboard").hide();
  $(".content").html("<div class='red'>"+questions[questionCount]+"</div>");
  $(".content").text();
  $(".answers").show();

  $('.choices').html("<br>");
  for(var i=0;i<4;i++)
  {
    $('.choices').append($('<button class="option btn btn-dark">'+options[questionCount][i]+'</button>'));
    if(i < 3)
    {
      $('.choices').append('&nbsp;|&nbsp;');
    }
  }
  $('.choices').append("<br><br>");

  $(".btn").on('click', evaluateAnswer);

  timeout = setTimeout(noAnswer, 11000);
  timer = setInterval(visualTimer, 1000);
}

function noAnswer()
{
  clearTimeout(timeout);
  unanswered++;

  $(".image").html("<img src="+answerImages[0]+" class='logo'>");
  $(".image").append("<br><br>");
  $(".choices").empty();
  $(".choices").hide();
  $(".content").html("<h2 class='red'>You didn't answer.</h2>");
  $(".content").append("<h4 class='red'>The correct answer is: "+answer+"</h4>");
  displayScore();
  
  questionCount++;

  if(questionCount > 9)
  {
    gameOver();
  }
  else
  {
    setTimeout(askQuestion,3000);
  }
}

function evaluateAnswer()
{ 
  clearTimeout(timeout);
  clearTimeout(timer);
  $(".choices").empty();
  $(".choices").hide();

  if($(this).text() === answer)
  {
    $(".image").html("<img src="+answerImages[1]+" class='logo'>");
    $(".image").append("<br><br>");
    $(".content").html("<h2 class='red'>Correct!</h2>");
    correct++;
    displayScore();
  }
  else
  {
    $(".image").html("<img src="+answerImages[2]+" class='logo'>");
    $(".image").append("<br><br>");
    $(".content").html("<h2 class='red'>Incorrect!</h2>");
    incorrect++;
    displayScore();
  }
  $(".content").append("<h4 class='red'>The correct answer is: " + answer + "</h4>");

  questionCount++;

  if(questionCount > 9)
  {
    gameOver();
  }
  else
  {
    setTimeout(askQuestion,3000);
  }
}

function visualTimer()
{
  timeLeft--;
  $(".remainingTime").html(timeLeft);
  console.log(timeLeft);
  if(timeLeft === 0)
  {
    clearTimeout(timer);
  }
}

function displayScore()
{
  $(".scoreboard").html("<div class='red'><h3>Unanswered: "+unanswered+"</h3><h3>Incorrect: "+incorrect+"</h3><h3>Correct: "+correct+"</h3></div>");
  $(".scoreboard").show();
}

function gameOver()
{
  $(".timer").hide();
  $(".image").html("<img src='assets/images/end.jpg'>");
  $(".content").html("<h1 class='red'>Movie Trivia Results</h1>");
  displayScore();

  $(".playAgain").show();
  $(".playAgain").html("<span class='content'><br><button class='endButton btn btn-dark'>Play Again</button></span>");
  
  $(".endButton").on('click',startGame);
}