/* global $ */
'use strict';

const store = {
  state: {
    quiz: false,
    endPage: false,
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
// start page
const startPage = () => {
  return '<h2>Welcome to Know Your Colors!</h2><button class="startBtn">Start Quiz!</button>';
};
// question and answer form generator

const questionTemplate = (q) => {
  let answers = q.answers.map((answer) => {
    return `<input type='radio' class='answerBtn' name="answerButton" value='${answer}' required><label for="${answer}">${answer}</label>`;
  }).join('');
  return `
          <h2>${q.question}</h2>
          <form>
          ${answers}
          <input type='submit' value='submit'/>
          </form>
          ${scoreBoardTemplate()}`;
};

const scoreBoardTemplate = () => {
  return `<h3>Wrong: ${store.state.wrong}, Question Number: ${store.state.indexCount + 1}</h3>`;
};

const endGameTemplate = () => {
  return `<h2>Congratulations</h2>
          <p>You got ${store.state.indexCount - store.state.wrong} correct!</p><p>Would you like to play again?</p><button class="retry">Try Again</button>`;
};

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store
function render() {
  if (!store.state.quiz) {
    $('main').html(startPage());
  } else if (store.state.quiz && store.state.indexCount !== store.questions.length) {
    $('main').html(questionTemplate(store.questions[store.state.indexCount]));
  } else if (store.state.indexCount === store.questions.length) {
    $('main').html(endGameTemplate());
  }
}


/********** EVENT HANDLER FUNCTIONS **********/
// These functions handle events (submit, click, etc)

const startHandler = () => {
  $('.startBtn').click(() => {
    store.state.quiz = true;
    render();
  });
};

const answerCheckHandler = () => {
  $('body').on('submit', 'form', function (e) {
    e.preventDefault();
    let answer = $('input[class="answerBtn"]:checked').val();
    if (answer === store.questions[store.state.indexCount].correctAnswer) {
      store.state.indexCount++;
      render();
    } else {
      store.state.wrong++;
      store.state.indexCount++;
      render();
    }
    render();
  });
};

const retryHandler = () => {
  $('body').on('click', '.retry', () => {
    store.state.quiz = false;
    store.state.endPage = false;
    store.state.correct = 0;
    store.state.wrong = 0;
    store.state.indexCount = 0;
    render();
  });
};

const main = () => {
  render();
  startHandler();
  answerCheckHandler();
  retryHandler();
};


$(main);