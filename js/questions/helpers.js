
const buttonClasses = ['text-white', 'border', 'hover:bg-purple-500', 'rounded'];

// Icons
export const icons = {
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
 * @returns {HTMLTableCellElement}
 */
export function createIcon() {
    const td = createTd("");

    return td;
}

/**
 * 
 * @param {String} str 
 * @param {Number} limit 
 * @returns {String}
 */
export function strLim(str, limit = 70) {
    if (str.length > limit) {
        return str.slice(0, limit) + "..."
    }

    return str;
}


/**
 * 
 * @param {String} icon 
 * @param {String} colorClass 
 * @returns {HTMLButtonElement}
 */
export function createButton(icon, colorClass) {
    const button = document.createElement('button');
    button.classList.add(...buttonClasses, colorClass);
    button.innerHTML = icon;

    return button;
}

/**
 * 
 * @param {String|HTMLElement} content 
 * @return {HTMLTableCellElement} 
 */
export function createTd(content) {
    const td = document.createElement("td");
    td.appendChild(
        typeof (content) === "object" ? content : document.createTextNode(content)
    );
    td.classList.add('px-4', 'py-2')
    return td;
}

