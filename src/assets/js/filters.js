const FILTER_TYPES = {
    TIME: 'time',
    NAME: 'name'
}

const ORDER_TYPES = {
    ASC: 'asc',
    DESC: 'desc'
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

class FilterToggle {

    filtersInstance = null;

    node = null;
    filterType = '';
    order = null

    constructor(node, filtersInstance) {
        this.filtersInstance = filtersInstance;
        this.node = node;
        this.filterType = node.dataset.filterToggle;

        this.node.addEventListener("click", () => {
            switch (this.order) {
                case ORDER_TYPES.ASC:
                    this.order = ORDER_TYPES.DESC
                    break;
                case ORDER_TYPES.DESC:
                    this.order = ORDER_TYPES.ASC
                    break;
                default:
                    this.order = ORDER_TYPES.ASC
            }

            this.filtersInstance.sortList(this.filterType, this.order)
        });
    }


}

export default class Filters {

    FilteredItemsInstances = []
    TogglersIntances = [];
    filterList = null;
    reordoredArr = null;

    constructor(node, paginationInstance) {
        this.parentNode = node;
        this.paginationInstance = paginationInstance;

        this.getElements()
        this.initEvents();
    }

    getElements = () => {
        this.filterList = this.parentNode.querySelector("[data-filter-list]");

        [...this.parentNode.querySelectorAll('[data-filter-toggle]')].map((toggle, index) => {
            this.TogglersIntances.push(new FilterToggle(toggle, this))
        });

        [...this.filterList.querySelectorAll("[data-filtered-item]")].map((item, index) => {
            this.FilteredItemsInstances.push(new FilteredItem(item))
        });
    }

    initEvents = () => {
        this.parentNode.querySelector(".filters").style.display = 'block';
    }

    sortList = (name, order) => {

        if (name === FILTER_TYPES.NAME) {
            this.reordoredArr = [...this.FilteredItemsInstances].sort(function(a, b) {
                if (order === ORDER_TYPES.DESC) {
                    const kek = a;
                    a = b;
                    b = kek;
                }
                if (b.nameValue > a.nameValue) {
                    return 1;
                }
                if (b.nameValue < a.nameValue) {
                    return -1;
                }
                return 0;
            });
        }

        if (name === FILTER_TYPES.TIME) {
            this.reordoredArr = [...this.FilteredItemsInstances].sort(function(a, b) {
                if (order === ORDER_TYPES.DESC) {
                    const kek = a;
                    a = b;
                    b = kek;
                }

                if (b.timeValue > a.timeValue) {
                    return 1;
                }
                if (b.timeValue < a.timeValue) {
                    return -1;
                }
                return 0;
            });
        }

        this.appendList();
    }

    appendList = () => {
        this.filterList.innerHTML= "";

        this.reordoredArr.map((item, index) => {
            this.filterList.appendChild(item.node)
        });

        this.paginationInstance && this.paginationInstance.resetPagination();
    }
}