/* global $ */

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
  return '<button class="startBtn">Start Quiz!</button>';
};
// question and answer form generator

const questionTemplate = (q) => {
  let answers = q.answers.map((answer) => {
    return `<li><label for="${answer}"><input type='radio' class='answerBtn' name="answerButton" value='${answer}' required>${answer}</label></li>`;
  }).join('');
  return `
          <h2>${q.question}</h2>
          <form>
          <ul>
          ${answers}
          </ul>
          <input type='submit' value='submit'/>
          </form>
          ${scoreBoardTemplate()}`;
};

const wrongAnswerTemplate = () => {
  return `<p class="wrong">The correct answer is ${store.questions[store.state.indexCount].correctAnswer} <span class="redX">✘</span></p><button class="continueBtn">Continue</button>`;
};

const correctAnswerTemplate = () => {
  return '<p class="correct">Woohoo! Correct! <span class="checkmark">✓</span></p><button class="continueBtn">Continue</button>';
};

const scoreBoardTemplate = () => {
  return `<h3>You currently have ${store.state.correct} correct.</h3><p>${store.questions.length - store.state.indexCount} questions remaining.`;
};

const endGameTemplate = () => {
  return `<h2>Congratulations</h2>
          <p>You got ${store.state.correct / store.questions.length * 100}% correct!</p><p>Would you like to play again?</p><button class="retry">Try Again</button>`;
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

function renderWrongAnswer() {
  $('main').html(wrongAnswerTemplate());
}

function renderCorrectAnswer() {
  $('main').html(correctAnswerTemplate());
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
      store.state.correct++;
      renderCorrectAnswer();
    } else {
      renderWrongAnswer();
      store.state.wrong++;
      store.state.indexCount++;

    }
    // render();
  });
};

const continueHandler = () => {
  $('body').on('click', '.continueBtn', () => {
    render();
  });
};

const retryHandler = () => {
  $('body').on('click', '.retry', () => {
    store.state.quiz = true;
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
  continueHandler();
};


$(main);