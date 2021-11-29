import test from "./js/test.js";
import login from "./js/login.js";

if (!localStorage.getItem("user")) {
    if (!window.location.href.includes("login"))
        window.location.replace("login.html");
}

test();
login();