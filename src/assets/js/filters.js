export default class Filters {

    filterBar = null;
    filterList = null;
    filterTime = null;
    filterName = null;

    constructor(name) {

        this.name = name;

        this.filterList = document.querySelector("[data-filters='" + this.name +"']");
        this.filterBar = this.filterList.previousElementSibling;
        this.filterTime = this.filterBar.querySelector("[data-timebtn]");
        this.filterName = this.filterBar.querySelector("[data-namebtn]");

        this.initFilter();
    }

    initFilter = () => {
        document.querySelector(".filters").style.display = 'block';

        this.filterTime.addEventListener("click", () => {
            this.sortList("time", this.filterTime.dataset.timebtn)
        });

        this.filterName.addEventListener("click", () => {
            this.sortList("name", this.filterName.dataset.namebtn)
        });
    }

    sortList = (name, order) => {
        console.log(name, order);
    }
}