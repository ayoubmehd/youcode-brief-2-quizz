import Question from "../models/Question"
const answersDOM = document.querySelector("#answers");
const questionTextDOM = document.querySelector("#questionText");
const answerClassName = `flex justify-center items-center border border-purple-400 hover:bg-purple-400 hover:text-white w-full cursor-pointer p-2 mb-2`;

const testState = {
    score: 0,
    progress: 1,
    done: false
}

let questions = null;
let question = null;

let currentIndex = -1;
let correctAnswerCount = 0;


const userAnswers = [];

/**
 * @constant {Array<DOMElment>} userClickedAt
 */
const userClickedAt = [];
const nbQuestions = 2;

function gameBoard() {

}

/**
 * 
 * @param {Object} question 
 * @returns {Number}
 */
function getCorrectAnswerCount(question) {
    return question.answers.filter(item => item.isCorrect).length
}

/**
 * @param {HTMLBaseElement} DOMElment 
 */
function select(DOMElment) {
    DOMElment.classList.add("bg-purple-400", "text-white");
    DOMElment.classList.remove("hover:bg-purple-400", "hover:text-white");
}

/**
 * @param {HTMLBaseElement} DOMElment 
 */
function success(DOMElment) {
    DOMElment.classList.add("bg-green-400");
    DOMElment.classList.remove("hover:bg-purple-400", "hover:text-white", "bg-purple-400", "text-white");
}

/**
 * @param {HTMLBaseElement} DOMElment
 */
function fail(DOMElment) {
    DOMElment.classList.add("bg-red-400");
    DOMElment.classList.remove("hover:bg-purple-400", "hover:text-white", "bg-purple-400", "text-white");
}

function removeEventListener() {
    for (const answerDOM of answersDOM.children) {
        answerDOM.removeEventListener("click", clickAnswers);
    }
}

function nextQuestion(questions) {
    if (testState.progress > nbQuestions) {
        console.log("Quizz End", testState.progress);
        testState.done = !testState.done;
        return false;
    }

    currentIndex = randIndex(questions);
}


function clickAnswers(e) {
    answer(e);
}
/**
 * 
 * @param {EventListenerOrEventListenerObject} param0 
 * @param {Object} question 
 * @param {Array} questions 
 */
function answer({ target }) {

    if (testState.done) return;

    // Get the index of the clicked question
    const index = parseInt(target.dataset.index);

    userAnswers.push(index);
    userClickedAt.push(target);

    correctAnswerCount--;

    select(target);

    if (correctAnswerCount <= 0) {
        removeEventListener();
        // Delete
        deleteQuestion(questions, currentIndex);

        let userCorrectAnswersCount = 0;
        for (const [arrayIndex, index] of userAnswers.entries()) {
            console.log(question, index);
            const isCorrect = isAnswerCorrect(question, index)
            const answer = getAnswer(question, index)
            if (isCorrect) {
                // Change the element color correct
                success(userClickedAt[arrayIndex]);

                userCorrectAnswersCount++;

            } else {
                // Change the element color wrong
                fail(userClickedAt[arrayIndex])
            }
        }

        if (userCorrectAnswersCount === getCorrectAnswerCount(question)) {
            // Increment Score
            testState.score++;
        }


        // Wait Form One 1.5 second to move to the next question
        setTimeout(() => {
            // removeAnimation()
            testState.progress++;
            startQuizz(questions)
        }, 1500)
    }
}

function getAnswer(question, answerIndex) {
    return question.answers[answerIndex];
}

function isAnswerCorrect(question, answerIndex) {
    return !!question.answers[answerIndex].isCorrect;
}

/**
 *
 * @param {Array} questions
 * @returns {Number}
 */
function randIndex(questions) {
    return Math.floor(Math.random() * (questions.length - 1));
}

/**
 * 
 * @param {Array} questions 
 * @param {Number} randIndex 
 * @returns {Question}
 */
function getQuestion(questions, randIndex) {
    return questions[randIndex];
}

/**
 * 
 * @param {Array} questions 
 * @param {Number} index 
 */
function deleteQuestion(questions, index) {
    questions.splice(index, 1);
}

function view(question) {

    if (testState.done) return;

    correctAnswerCount = getCorrectAnswerCount(question);

    // Dispay Question text in the question text dom.
    questionTextDOM.innerHTML = question.question;

    answersDOM.innerHTML = "";

    if (question.answers) {
        for (const [index, val] of question.answers.entries()) {

            // Create Element for current answer
            const answerDOM = document.createElement("article")
            answerDOM.className = answerClassName;

            // Set the Index to the html element
            answerDOM.dataset.index = index;

            // Add answer text
            answerDOM.innerHTML = val.text

            // Add click event handler
            answerDOM.addEventListener("click", clickAnswers);

            // append elements to the answers DOM Element
            answersDOM.appendChild(
                answerDOM
            );
        }
    }

}

function endQuizz() {

    removeEventListener();
    questionTextDOM.innerHTML = "";
    answersDOM.innerHTML = "";
}


function startQuizz(questions) {

    // Random Index From The questions Array
    nextQuestion(questions);

    if (testState.done) {
        endQuizz();
        return;
    }

    // Get the random Element from The Array
    question = getQuestion(questions, currentIndex);

    // View
    view(question);

}

export default async function () {

    if (!answersDOM) return;
    if (!questionTextDOM) return;

    const q = new Question();

    const res = await q.findAll();
    questions = await res.json();

    startQuizz(questions)

}