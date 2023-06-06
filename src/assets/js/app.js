import Darkmode from "./darkmode.js";
import Pagination from "./pagination.js";
import Filters from "./filters.js";
window.addEventListener('DOMContentLoaded', (event) => {
    new Darkmode();

    const paginateInstances = [];

    [...document.querySelectorAll('[data-paginate]')].map((paginate, index) => {
        paginateInstances.push({
            identifier: paginate.getAttribute('data-paginate'),
            instance: new Pagination(paginate, 9)
        })
    });

    [...document.querySelectorAll('[data-filters]')].map((filter, index) => {
        const identifier = filter.getAttribute('data-filters')
        const paginateIndex = paginateInstances.findIndex((elem) => elem.identifier === identifier)

        new Filters(filter, paginateIndex !== -1 ? paginateInstances[paginateIndex].instance : null);
    })
});