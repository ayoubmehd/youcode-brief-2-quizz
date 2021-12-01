import Question from "../models/Question"
import answers, { answersArray, setAnswersArray } from "./questions/answers";
import dom from "./questions/dom";
import { getAllLevels, showAllLevels, levelId, setLevelId } from "./questions/levels.js"
import { icons, createIcon, createButton, strLim } from "./questions/helpers"

let editingId = null;

//     
const addQuestionForm = document.querySelector("#add-question");


// CTA Button Classes

/**
 * 
 * @param {String} text 
 * @return {HTMLTableCellElement} 
 */
function createTd(text) {
    const td = document.createElement("td");
    td.textContent = text;
    td.classList.add('px-4', 'py-2')
    return td;
}


function createEditIcon(id) {
    const td = createIcon();
    const button = createButton(icons.edit, 'bg-purple-400');

    button.addEventListener("click", async () => {
        editingId = id;
        const question = await getQuestion(id);
        addQuestionForm.questionText.value = question.question;
        setLevelId(question.levelId);
        showAllLevels(
            await getAllLevels()
        );
        dom();
        setAnswersArray(question.answers || []);
    });

    td.appendChild(button);

    return td;
}

/**
 * 
 * @param {Number} id 
 * @returns {HTMLTableCellElement}
 */
function createDeleteIcon(id) {
    const td = createIcon("edit");
    const button = createButton(icons.delete, 'bg-red-400');

    button.addEventListener("click", async () => {
        await removeQuestion(id);
        showAllQuestions(
            await getAllQeustions()
        );
    });

    td.appendChild(button);

    return td;
}

function showAllQuestions(questions) {
    const questionsTable = document.querySelector("#questions tbody");

    questionsTable.innerHTML = "";

    for (const question of questions) {
        const tr = document.createElement("tr");
        tr.classList.add("border-b", 'border-gray-500');
        tr.append(
            createTd(strLim(question.question)),
            createTd(question.answers && question.answers.length),
            createTd(question.level && question.level.description),
            createEditIcon(question.id),
            createDeleteIcon(question.id)
        );
        questionsTable.appendChild(tr);
    }

}

async function resetQuestionForm() {

    showAllQuestions(
        await getAllQeustions()
    );
    // Clear asnwers Array
    setAnswersArray([]);
    showAllLevels(
        await getAllLevels()
    );
    editingId = null;

}

async function getAllQeustions() {

    const question = new Question();

    const res = await question.findAll();

    return await res.json();

}


function saveQuestion(data) {

    const question = new Question(data);

    return question.create().then(res => res.json())

}

/**
 * 
 * @param {Number} id 
 */
function getQuestion(id) {

    const question = new Question();

    return question.find(id).then(res => res.json());

}

/**
 * 
 * @param {Number} id 
 */
function removeQuestion(id) {

    const question = new Question();

    return question.delete(id).then(res => res.text());

}



export default async function () {

    // On load
    showAllQuestions(
        await getAllQeustions()
    );

    showAllLevels(
        await getAllLevels()
    );

    // For Editing and Adding a new Qeustion
    addQuestionForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Error handeling
        /**
         * @todo: Show an error message to the user bellow html
         */
        if (!levelId) {
            alert("Level Is Required");
            return;
        }
        if (!addQuestionForm.questionText.value) {
            alert("Question can't be empty");
            return;
        }


        // The data
        const payload = {
            question: addQuestionForm.questionText.value,
            levelId: levelId,
            answers: [...answersArray]
        };

        // Clear asnwers Array
        setAnswersArray([]);

        // Editing q question with the id {editingId}
        if (editingId) {

            const question = new Question(payload);

            await question.update(editingId);

            addQuestionForm.reset();
            return;
        }

        // Saving a new Question
        await saveQuestion(payload);
        addQuestionForm.reset();

    });

    addQuestionForm.addEventListener("reset", () => resetQuestionForm());

    // Add an effect to the Levels radio input
    dom();

    // Show the add asnwer form
    answers();
}