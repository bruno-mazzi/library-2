import Darkmode from "./darkmode.js";
import Pagination from "./pagination.js";
window.addEventListener('DOMContentLoaded', (event) => {
    const darkmode = new Darkmode();
    darkmode.buttonToggle();

    new Pagination();
});