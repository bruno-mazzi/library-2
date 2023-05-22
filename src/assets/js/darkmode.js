export default class Darkmode {

    constructor() {
        const currentTheme = localStorage.getItem("theme");

        if (currentTheme == "dark") {
            document.body.classList.toggle("page--dark");
        } else if (currentTheme == "light") {
            document.body.classList.toggle("page--light");
        }
    }

    buttonToggle = () => {
        const btn = document.querySelector(".btn-toggle");
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
        let theme;

        btn.addEventListener("click", function() {
            if (prefersDarkScheme.matches) {
                document.body.classList.toggle("page--light");
                theme = document.body.classList.contains("page--light") ? "light" : "dark";
            } else {
                document.body.classList.toggle("page--dark");
                theme = document.body.classList.contains("page--dark") ? "dark" : "light";
            }

            localStorage.setItem("theme", theme);
        });
    }
}