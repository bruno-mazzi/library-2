const BODY = document.body;
const PREFER_COLOR = window.matchMedia("(prefers-color-scheme: dark)");

export default class Darkmode {


    constructor() {
        this.currentTheme();
        this.buttonToggle();
    }

    currentTheme = () => {
        this.localTheme = localStorage.getItem("theme");

        if (this.localTheme == "dark") {
            BODY.classList.toggle("page--dark");
        } else if (this.localTheme == "light") {
            BODY.classList.toggle("page--light");
        }
    }

    buttonToggle = () => {
        this.btn = document.querySelector("[data-theme]");
        let theme;

        this.btn.addEventListener("click", function() {
            if (PREFER_COLOR.matches) {
                BODY.classList.toggle("page--light");
                theme = BODY.classList.contains("page--light") ? "light" : "dark";
            } else {
                BODY.classList.toggle("page--dark");
                theme = BODY.classList.contains("page--dark") ? "dark" : "light";
            }

            localStorage.setItem("theme", theme);
        });
    }
}