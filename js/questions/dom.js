function toggleBackground(element) {
    if (element.checked) {
        element.parentElement.classList.add("bg-purple-400", "text-white");
        return;
    }

    element.parentElement.classList.remove("bg-purple-400", "text-white");
}

export default function () {
    const radioButtons = Array.from(document.querySelectorAll("input[type='radio']"));
    radioButtons.forEach((element) => {
        toggleBackground(element);
        element.addEventListener("change", () => {
            radioButtons.forEach(el => toggleBackground(el))
        })
    });
}