
   
   $(document).ready(function() {

    var questionarray = [{
        question: "What is the population of Brazil?",
        choices: ["145 million", "199 million", "182 million", "205 million"],
        correctAnswer: 1,
        gif: "assets/images/question1.gif",
    }, {
        question: "What is 27*14?",
        choices: ["485", "634", "408", "528"],
        correctAnswer: 2,
        gif: "assets/images/question2.gif",
    }, {
        question: "What is the busiest train station in the world?",
        choices: ["Grand Central, NY", "Shibuya, Tokyo", "Beijing Central, Chine", "Gard du Nord, Paris"],
        correctAnswer: 1,
        gif: "assets/images/question3.gif",
    }, {
        question: "What is the longest river?",
        choices: ["Nile", "Amazon", "Mississippi", "Yangtze"],
        correctAnswer: 0,
        gif: "assets/images/question4.gif",
    }, {
        question: "What is the busiest tube station in the London?",
        choices: ["Waterloo", "Baker Street", "Kings Cross", "Victoria"],
        correctAnswer: 0,
        gif: "assets/images/question5.gif",
    }];

console.log(questionarray);


startpage();

// start of startpage function
function startpage(){
   var startbutton = $("<p>") 
   startbutton.html("Start")
   startbutton.attr("class", "startbutton"); 
   $("#content").append(startbutton);

   $(".startbutton").on("click",function() {   
    $("#content").empty();
    runtimer()
    displayQuestion();
});

//end of startpage function
}


//global var
var currentQuestion = 0;
console.log("start!" + currentQuestion);


// timer functions start
    var number = 10;
    var intervalId;



    function runtimer() {
      $("#timer").html("<p> Time Remaining:  10 seconds <p>");
      clearInterval(intervalId);
      intervalId = setInterval(countdown, 1000);
    }

    function countdown() {
     
      number--;
      $("#timer").html("<p> Time Remaining:  " + number + " seconds <p>");

      if (number === 0) {
      stoptimer();
      ShowTimeoutPage();
      notanswer++; 
      //not answered question is increasing by one
      console.log("not answered: " + notanswer)
      }
    }

    function stoptimer() {
      clearInterval(intervalId);
    }
//timer functions end



//start of displayQuestion function
function displayQuestion(){
   var messageArea = $("#content");  
   var QuestionDisplay = $("<p>") 
   QuestionDisplay.text(questionarray[currentQuestion].question)
   QuestionDisplay.attr("class", "questionarea"); 
   $(messageArea).append(QuestionDisplay);

 for(i=0; i<4; i++){
    var subAnswer = $("<h2>") 
   subAnswer.text(questionarray[currentQuestion].choices[i])
   subAnswer.attr("class", "answerlist");  
   $(messageArea).append(subAnswer);
}

//end of displayQuestion function
}

//set global var
var correct = 0;
var wrong = 0;
var notanswer = 0;
var userchoice;
// var correctindex = questionarray[currentQuestion].correctAnswer; // Index of correct answer

//start of onclick event
$(document).on("click", ".answerlist", function() {
stoptimer();
// correctindex = questionarray[currentQuestion].correctAnswer
var userchoice = questionarray[currentQuestion].choices.indexOf($(this).text());
console.log("user choose: " + userchoice); //return a index of userchoice


//start of compare
if(userchoice == questionarray[currentQuestion].correctAnswer){
//use user select index to compare with correct index
    console.log("correct answer should be: " +  questionarray[currentQuestion].correctAnswer); // return the correct index
 // move on to next question
    ShowCorrectPage();
    correct++;
    currentQuestion++; 
    console.log("current question is: " + currentQuestion)
    console.log("correct count: " + correct)    
}

else if(userchoice !== questionarray[currentQuestion].correctAnswer){
    ShowWrongPage();
    currentQuestion++;  // move on to next question
    wrong++
    console.log("current question " + currentQuestion)
    console.log("wrong count: " + wrong)
}


//end of onclick event
});

// console.log("hh " + currentQuestion)
// if(currentQuestion = questionarray.length){
//     console.log("cQ " + currentQuestion)
//     console.log("lll " + questionarray.length)
//     gameoverpage();
// }



// start of ShowCorrectPage function
function ShowCorrectPage(){
    $("#content").empty();
     //empty the question/answer page before show the win page

    // function alert(){alert("Hi Hi Hi")}
    setTimeout(NextQuestion, 3000)
    // display next question 3 seconds after you see this page

    var messageArea = $("#content");    
    messageArea.attr("class", "message-content")

    // Declare content that will go into the messageArea
    var winMessage = $("<h2>");
    var detail = $("<p>")
    var image = $("<img>")

    // Append it all to the content container and add text and images
    $(messageArea).append(winMessage);
    $(messageArea).append(detail);
    $(messageArea).append(image);
 
    winMessage.text("Correct!");
    detail.text(questionarray[currentQuestion].choices[questionarray[currentQuestion].correctAnswer])
    //actually gives you choices[x], x is the in the correctAnswer as a object
    image.attr("src", questionarray[currentQuestion].gif)

// end of ShowCorrectPage function
}

// start of ShowWrongPage function
function ShowWrongPage(){
    $("#content").empty();
     //empty the question/answer page first
    setTimeout(NextQuestion, 3000)
    // display next question 3 seconds after you see this page

    var messageArea = $("#content");    
    messageArea.attr("class", "message-content")

    // Declare content that will go into the messageArea
    var lossMessage = $("<h2>");
    var detail = $("<p>")
    var image = $("<img>")

    // Append it all to the content container and add text and images
    $(messageArea).append(lossMessage);
    $(messageArea).append(detail);
    $(messageArea).append(image);
 
    lossMessage.html("Nope!");
    detail.html("The Correct Answer was: " + (questionarray[currentQuestion].choices[questionarray[currentQuestion].correctAnswer]));
    image.attr("src", questionarray[currentQuestion].gif)

// end of ShowWronngPage function
}

// start of ShowTimeoutPage function
function ShowTimeoutPage(){
    $("#content").empty();
     //empty the question/answer page first
    setTimeout(NextQuestion, 3000)
    // display next question 3 seconds after you see this page

    var messageArea = $("#content");    
    messageArea.attr("class", "message-content")

    // Declare content that will go into the messageArea
    var TimeoutMessage = $("<h2>");
    var detail = $("<p>")
    var image = $("<img>")

    // Append it all to the content container and add text and images
   
    $(messageArea).append(TimeoutMessage);
    $(messageArea).append(detail);
    $(messageArea).append(image);
 
    TimeoutMessage.html("Out of Time!");
    detail.html("The Correct Answer was: " + (questionarray[currentQuestion].choices[questionarray[currentQuestion].correctAnswer]));
    image.attr("src", questionarray[currentQuestion].gif)

// end of ShowTimeoutPage function
}


//this function allows pages to empty before display the next question
function NextQuestion(){
   //find all div and make it empty
   $("#content").empty();
   number = 10;
   runtimer()
   displayQuestion();
}



//gameover function
function gameoverpage(){
    $("#content").empty();
    var summary =
    "All done, here's how you did! " +
      "<p>Correct Answers: " + correct + "</p>" +
      "<p>Incorrect Answers: " + wrong + "</p>" +
      "<p>Unanswered: " + notanswer + "</p>";
      $("#content").append(summary);

//creating a startover button
      var startoverbutton = $("<p>") 
      startoverbutton.html("Start Over")
      startoverbutton.attr("class", "startoverbutton"); 
      $("#content").append(startoverbutton);

//set onclick event on the startover button
      $(".startoverbutton").on("click",function() {   
      startover(); //call the startover function when the startover button is clicked;
   });      
}

//startover function
function startover(){
    $("#content").empty();  
    currentQuestion = 0;
    correct = 0;
    wrong = 0;
    notanswer = 0;
    number = 10;
    startpage();
}







//end of document ready
})
