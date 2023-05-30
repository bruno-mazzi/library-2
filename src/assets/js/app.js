import Darkmode from "./darkmode.js";
import Pagination from "./pagination.js";
import Filter from "./filter.js";
window.addEventListener('DOMContentLoaded', (event) => {
    new Darkmode();
    new Pagination( "booksList", 9);
    new Filter("bookList");
});