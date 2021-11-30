import Question from "../models/Question"
import answers, { answersArray, setAnswersArray } from "./questions/answers";
import dom from "./questions/dom";
import { getAllLevels, showAllLevels, levelId, setLevelId } from "./questions/levels.js"

let editingId = null;

//     
const addQuestionForm = document.querySelector("#add-question");


// CTA Button Classes
const buttonClasses = ['text-white', 'border', 'hover:bg-purple-500', 'rounded'];

// Icons
const icons = {
    edit: `
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
        </svg>
    `,
    delete: `
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
        </svg>
    `
};


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

/**
 * 
 * @returns {HTMLTableCellElement}
 */
function createIcon() {
    const td = createTd("");

    return td;
}

function createButton(icon, colorClass) {
    const button = document.createElement('button');
    button.classList.add(...buttonClasses, colorClass);
    button.innerHTML = icon;

    return button;
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
        tr.classList.add("border-b");
        tr.append(
            createTd(question.question.slice(0, 70) + "..."),
            createTd(question.answers && question.answers.length),
            createTd(question.level && question.level.description),
            createEditIcon(question.id),
            createDeleteIcon(question.id)
        );
        questionsTable.appendChild(tr);
    }

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

    addQuestionForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const payload = {
            question: addQuestionForm.questionText.value,
            levelId: levelId,
            answers: answersArray
        };

        setAnswersArray([]);
        if (editingId) {

            const question = new Question(payload);

            await question.update(editingId);

            showAllQuestions(
                await getAllQeustions()
            );
            addQuestionForm.reset();

            editingId = null;
            return;
        }

        await saveQuestion(payload);
        addQuestionForm.reset();
        showAllQuestions(
            await getAllQeustions()
        );

    });

    dom();
    answers();
}