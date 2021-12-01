import Level from "../../models/Level";

const levelsDOM = document.querySelector("#levels");

export let levelId = null;




// Levels

export async function setLevelId(id) {
    levelId = id;

    showAllLevels(
        await getAllLevels()
    );
}

/**
 * 
 * @param {Array} levels 
 */
export function showAllLevels(levels) {



    levelsDOM.innerHTML = "";

    for (const [index, level] of levels.entries()) {
        const label = document.createElement("label");
        label.className = "block p-2 rounded cursor-pointer";
        const inputId = `level-${index}`;

        label.setAttribute("for", inputId);

        const input = document.createElement("input");

        input.className = "hidden";
        input.type = "radio";
        input.name = "level";
        input.id = inputId;
        input.value = level.id;
        input.checked = levelId === level.id;

        input.addEventListener("change", () => {
            console.log(levelId);
            if (input.checked) {
                levelId = parseInt(input.value);
            }
        });

        label.appendChild(input);

        label.appendChild(
            document.createTextNode(
                level.description.slice(0, 10)
            )
        );

        levelsDOM.appendChild(label);
    }

}

export function getAllLevels() {
    const level = new Level();

    return level.findAll().then(res => res.json());
}