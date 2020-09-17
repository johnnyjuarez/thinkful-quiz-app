/* global $ */
'use strict';

const store = {
  state: {
    welcomeMessage: '<h1>Welcome to know your Colors</h1><button class="startBtn">Start Quiz</button>',
    welcomePage: true,
    quizPage: false,
    correct: 0,
    wrong: 0,
    indexCount: 0,
  },
  questions: [
    {
      question: 'What color mixing makes  Orange?',
      answers: ['Red and Yellow', 'Pink and Green', 'Green and Yellow'],
      correctAnswer: 'Red and Yellow'
    },
    {
      question: 'What color mixing makes Purple?',
      answers: ['Purple and Yellow', 'Blue and Red', 'Pink and Yellow'],
      correctAnswer: 'Blue and Red'
    },
    {
      question: 'What color mixing makes Green?',
      answers: ['White and Yellow', 'Black and Red', 'Blue and Yellow'],
      correctAnswer: 'Blue and Yellow'
    },
    {
      question: 'What color mixing makes Gray?',
      answers: ['White and Brown', 'White and Black', 'Black and Gray'],
      correctAnswer: 'White and Black'
    },
    {
      question: 'What color mixing makes Pink?',
      answers: ['White and Orange', 'White and Yellow', 'White and Red'],
      correctAnswer: 'White and Red'
    }
  ]
};

let quizHtml;
let answerHtml;

// Welcome function to render welcome html

// start button handler


// a function for the questions and answers that utilizes a template string


//! answers must be in a form

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

const questionGenerateHtml = (obj, answers) => {
  return `<h2>${obj.question}</h2>
          <form>
          ${answers}
          </form>`;
};

const answerGenerateHTML = (obj) => {
  return obj.answers.map((a) => {
    return `<input type='submit' class='answerBtn' value='${a}'>`;
  }).join('');
};

const endScreenHTML = () => {
  return '<h3>The End</h3>';
};

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store
const render = () => {
  if (store.state.welcomePage) {
    $('main').html(store.state.welcomeMessage);
  } else if (store.state.quizPage && !store.state.welcomePage) {
    if (store.state.indexCount < store.questions.length) {
      answerHtml = answerGenerateHTML(store.questions[store.state.indexCount]);
      quizHtml = questionGenerateHtml(store.questions[store.state.indexCount], answerHtml);

      $('main').html(quizHtml);
    }
  } else if (store.state.questionCount > store.questions.length) {
    $('main').html(endScreenHTML());
  }
};


/********** EVENT HANDLER FUNCTIONS **********/
// These functions handle events (submit, click, etc)
const answerHandler = () => {
  $('main').on('click', '.answerBtn', (e) => {
    e.preventDefault();
    console.log($(e.currentTarget).val());
    store.state.indexCount++;
    render();
  });

};

const startHandler = () => {
  $('.startBtn').click(() => {
    store.state.welcomePage = false;
    store.state.quizPage = true;
    render();
  });
};

const welcome = () => {
  render();
  startHandler();
};


const main = () => {
  answerHandler();
  welcome();
};


$(main);