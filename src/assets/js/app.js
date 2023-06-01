import Darkmode from "./darkmode.js";
import Pagination from "./pagination.js";
import Filters from "./filters.js";
window.addEventListener('DOMContentLoaded', (event) => {
    new Darkmode();
    new Pagination( "booksList", 9);
    new Filters("booksList");
});