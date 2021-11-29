import User from "../models/User";

const loginFormDOM = document.querySelector("#login");

async function login(username, password) {
    const user = new User();
    try {
        const res = await user.login(username, password);
        if (res) {
            localStorage.setItem("user", JSON.stringify(res));
            window.location.replace("index.html");
        }
    } catch (err) {

    }
}

export default function () {
    if (!loginFormDOM) return;


    loginFormDOM.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log(loginFormDOM);
        login(loginFormDOM.username.value, loginFormDOM.password.value);
    })
}