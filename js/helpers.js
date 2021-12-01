import { createButton, icons } from "./questions/helpers";

/**
 * 
 * @returns {HTMLButtonElement}
 */
export function createDeleteButton() {
    const button = createButton(icons.delete, 'bg-red-400');

    return button;
}