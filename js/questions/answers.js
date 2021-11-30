import { createTd } from "./helpers";

const answersDOM = document.querySelector("#answers tbody");
export let answersArray = [];

/**
 * @ {}
 */
let addFormRef = null;

export function clearAnswers() {

    answersDOM.innerHTML = "";

    answersDOM.appendChild(
        addFormRef
    );
}

/**
 * 
 * @param {Array} newValue 
 */
export function setAnswersArray(newValue) {
    answersArray = newValue;
    updateUI();
}


const buttonClasses = [
    "bg-purple-400",
    "text-white",
    "border",
    "hover:bg-purple-500",
    "py-1",
    "px-2"
];

function addAnswer(text, isCorrect) {
    answersArray.push({
        text,
        isCorrect
    });

    updateUI();
}

function createLevelInput(checked = false) {

    const input = document.createElement("input");

    input.name = "level";
    input.type = "checkbox";
    input.checked = checked;
    return input;
}

/**
 * @returns {HTMLTableRowElement}
 */

function addForm() {

    const input = document.createElement("input");
    input.className = "p-2 block w-full bg-gray-100";

    const levelInput = createLevelInput();

    const button = document.createElement("button");
    button.className = buttonClasses.join(" ");
    button.textContent = "Add";
    button.type = "button";
    button.addEventListener("click", () => {
        addAnswer(input.value, levelInput.checked);
        input.value = "";
        levelInput.checked = false;
    });

    const tr = document.createElement("tr");

    tr.append(
        createTd(
            input
        ),
        createTd(
            levelInput
        ),
        createTd(
            button
        )
    );

    return tr;
}


function updateUI() {

    clearAnswers();

    for (const [index, answer] of answersArray.entries()) {

        const tr = document.createElement("tr");

        const levelInput = createLevelInput(answer.isCorrect);

        levelInput.addEventListener("change", () => {
            answersArray[index].isCorrect = levelInput.checked;
            console.log(answersArray[index]);
        });

        tr.append(
            createTd(answer.text),
            createTd(levelInput)
        );

        addFormRef.insertAdjacentElement("beforebegin", tr);

    }

}

export default async function () {

    addFormRef = addForm();

    answersDOM.appendChild(
        addFormRef
    );

}