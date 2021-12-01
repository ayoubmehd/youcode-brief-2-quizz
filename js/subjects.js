import Subject from "../models/Subject";
import { createDeleteButton } from "./helpers";
import { icons, createIcon, createButton, createTd } from "./questions/helpers"


const addSubjectForm = document.querySelector("#add-subject");
const parentDOM = document.querySelector("#parent");
const childsDOM = document.querySelector("#childs");


let parentSubject = null;
let childsSubject = [];


function updateParentUI() {

    const parentDOMTBody = parentDOM.querySelector("tbody");
    parentDOMTBody.innerHTML = "";

    if (!parentSubject) return;

    const button = createDeleteButton();

    button.addEventListener("click", () => {
        parentSubject = null
        updateParentUI()
    });

    const tr = document.createElement("tr");
    tr.append(
        createTd(parentSubject.title),
        createTd(button)
    );

    parentDOMTBody.appendChild(tr);
}

function updateChildsUI() {
    const childsDOMTBody = childsDOM.querySelector("tbody");
    childsDOMTBody.innerHTML = "";

    if (!childsSubject) return;

    /**
    * 
    * @param {Number} id 
    * @returns {HTMLTableCellElement}
    */
    function createDeleteIcon(index) {
        const td = createIcon("delete");
        const button = createButton(icons.delete, 'bg-red-400');

        button.addEventListener("click", () => {
            childsSubject.splice(index, 1);

            updateChildsUI();
        });

        td.appendChild(button);

        return td;
    }

    for (const [index, childSubject] of childsSubject.entries()) {
        const tr = document.createElement("tr");
        tr.append(
            createTd(childSubject.title),
            createDeleteIcon(index)
        );
        childsDOMTBody.appendChild(tr);
    }
}

/**
 *
 * @param {Number} id
 * @returns {HTMLTableCellElement}
 */
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
    const td = createIcon("delete");
    const button = createButton(icons.delete, 'bg-red-400');

    button.addEventListener("click", async () => {
        await removeSubject(id);
        showAllSubjects(
            await getAllSubjects()
        );
    });

    td.appendChild(button);

    return td;
}

/**
 * 
 * @returns {Promise}
 */
function getAllSubjects() {
    const subject = new Subject();

    return subject.findAll().then(res => res.json());
}

/**
 * 
 * @param {String} title 
 * @param {Number} parentId
 * @returns {Promise}
 */
function createSubject(title, parentId) {
    const subject = new Subject({
        title,
        subjectId: parentId
    });
    // return subject.create()
    return subject.create().then(res => res.json()).then(async data => {
        for (const subject of childsSubject) {
            (await (new Subject({
                subjectId: data.id
            })).update(subject.id))
        }
    });
}

/**
 * 
 * @param {String} title 
 * @param {Number} parentId
 * @returns {Promise}
 */
function removeSubject(id) {
    const subject = new Subject();
    return subject.delete(id).then(res => res.json());
}

function showAllSubjects(subjects) {

    const subjectsTable = document.querySelector("#subjects tbody");

    subjectsTable.innerHTML = "";

    for (const subject of subjects) {
        const tr = document.createElement("tr");
        tr.classList.add("border-b", 'border-gray-500');

        tr.draggable = true;

        tr.dataset.id = Subject.id;

        tr.append(
            createTd(subject.title),
            createTd(subject.subjects ? subject.subjects.length : ""),
            createTd(subject.subject ? subject.subject.title : ""),
            createEditIcon(subject.id),
            createDeleteIcon(subject.id)
        );


        // Drag Start event for every table row element
        tr.addEventListener("dragstart", event => {
            event.dataTransfer.dropEffect = "link";
            event.dataTransfer.setData("text/plain",
                JSON.stringify({
                    id: subject.id,
                    title: subject.title
                })
            );
        });



        subjectsTable.appendChild(tr);
    }

}


export default async function () {

    if (!addSubjectForm) return;

    // On load
    showAllSubjects(
        await getAllSubjects()
    );


    // For Editing and Adding a new Qeustion
    addSubjectForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (!addSubjectForm.title.value) {
            alert("Title Shoudn't be empty");
            return;
        }

        await createSubject(addSubjectForm.title.value, parentSubject ? parentSubject.id : "default");

        showAllSubjects(
            await getAllSubjects()
        );

    });

    // Drag and Drop Events
    // Parent drop
    parentDOM.addEventListener("drop", ev => {
        ev.preventDefault();
        const subject = JSON.parse(ev.dataTransfer.getData("text/plain"));
        parentSubject = subject;
        updateParentUI();
    });

    // Child Drop
    childsDOM.addEventListener("drop", ev => {
        ev.preventDefault();
        const subject = JSON.parse(ev.dataTransfer.getData("text/plain"));

        const isAlredyChild = childsSubject.find(el => el.id === subject.id);
        const isAlredyParent = parentSubject && subject.id === parentSubject.id;

        if (!isAlredyChild && !isAlredyParent) {
            childsSubject.push(subject);
            updateChildsUI();
        }
    });

    parentDOM.addEventListener("dragover", ev => ev.preventDefault());
    childsDOM.addEventListener("dragover", ev => ev.preventDefault());

}