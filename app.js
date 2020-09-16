/* global $ */
'use strict';

const pageStore = {
  // welcomePage: true
  welcomeMessage: '<h1>Welcome to know your Colors</h1><button class="startBtn">Start Quiz</button>',
  welcomePage: true,
  quizPage: false
};

const questions = [
  {
    question: 'What color mixing makes  Orange?',
    answers: [
      'A. Red and Yellow',
      'B. Pink and Green',
      'C. Green and Yellow',
    ],
    correctAnswer: 'A'
  },
  {
    question: 'What color mixing makes Purple?',
    answers: [
      'A. Purple and Yellow',
      'B. Blue and Red',
      'C. Pink and Yellow',
    ],
    correctAnswer: 'B'
  },
  {
    question: 'What color mixing makes Green?',
    answers: [
      'A. White and Yellow',
      'B. Black and Red',
      'C. Blue and Yellow',
    ],
    correctAnswer: 'C'
  },
  {
    question: 'What color mixing makes Gray?',
    answers: [
      'A. White and Brown',
      'B. White and Black',
      'C. Black and Gray',
    ],
    correctAnswer: 'B'
  },
  {
    question: 'What color mixing makes Pink?',
    answers: [
      'A. White and Orange',
      'B. White and Yellow',
      'C. White and Red',
    ],
    correctAnswer: 'C'
  }
]

// Welcome function to render welcome html
const welcome = () => {
  render();
  startHandler();
};

// start button handler
const startHandler = () => {
  $('.startBtn').click(() => {
    pageStore.welcomePage = false;
    pageStore.quizPage = true;
    render();
  });
};

// a function for the questions and answers that utilizes a template string
const quiz = () => {

};
//! answers must be in a form



const render = () => {
  if (pageStore.welcomePage) {
    $('main').html(pageStore.welcomeMessage);
  } else {
    $('main').empty();
  }
};

const main = () => {
  welcome();
};

$(main);


/**
 *
 * Technical requirements:
 *
 * Your app should include a render() function, that regenerates the view each time the store is updated.
 * See your course material, consult your instructor, and reference the slides for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 *
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/
// These functions handle events (submit, click, etc)