const FILTER_TYPES = {
    TIME: 'time',
    NAME: 'name'
}



class FilteredItem {
    node = null
    nameValue = ''
    timeValue = ''

    constructor(node) {
        this.node = node
        this.nameValue = node.querySelector('[data-name]').getAttribute('data-name')
        this.timeValue = node.querySelector('[data-time]').getAttribute('data-time')
    }

}

export default class Filters {

    FilteredItemsInstances = []
    filterBar = null;
    filterList = null;
    filterTime = null;
    filterName = null;

    constructor(name) {
        this.name = name;

        this.getElements()
        this.initEvents();
    }

    getElements = () => {
        this.filterList = document.querySelector("[data-filters='" + this.name +"']");
        this.filterBar = this.filterList.previousElementSibling;
        this.filterTime = this.filterBar.querySelector("[data-timebtn]");
        this.filterName = this.filterBar.querySelector("[data-namebtn]");

        [...this.filterList.querySelectorAll("[data-filtered-item]")].map((item, index) => {
            this.FilteredItemsInstances.push(new FilteredItem(item))
        });
    }

    initEvents = () => {
        document.querySelector(".filters").style.display = 'block';

        this.filterTime.addEventListener("click", () => {
            this.sortList(FILTER_TYPES.TIME, this.filterTime.dataset.timebtn)
        });

        this.filterName.addEventListener("click", () => {
            this.sortList(FILTER_TYPES.NAME, this.filterName.dataset.namebtn)
        });
    }

    sortList = (name, order) => {

        if (name === FILTER_TYPES.NAME) {
            const reordoredArr = [...this.FilteredItemsInstances].sort(function(a, b) {
                if (a.nameValue > b.nameValue) {
                    return 1;
                }
                if (a.nameValue < b.nameValue) {
                    return -1;
                }
                return 0;
            });

            reordoredArr.map((item, index) => {
                this.filterList.appendChild(item.node)
            })

            console.log(reordoredArr);
            //filteredList.forEach( (filteredList) => {
            //    let parent = filteredList.closest("[data-element]");
            //
            //});
        }

        if (name === FILTER_TYPES.TIME) {
            filteredList = Array.from(this.filterList.querySelectorAll("[data-time]"));
        }
    }
}