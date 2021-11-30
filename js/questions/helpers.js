/**
 * 
 * @param {String|HTMLElement} content 
 * @return {HTMLTableCellElement} 
 */
export function createTd(content) {
    const td = document.createElement("td");
    td.appendChild(typeof (content) === "string" ? document.createTextNode(content) : content);
    td.classList.add('px-4', 'py-2')
    return td;
}