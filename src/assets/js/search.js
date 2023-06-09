export default class Search {

    searchList = null;
    searchedItems = null;
    searchQuery = null;

    constructor(node, paginationInstance) {
        this.parentNode = node;
        this.paginationInstance = paginationInstance;

        this.getElements();
        this.searchFilter();
    }

    getElements = () => {
        this.searchList = this.parentNode.querySelector("[data-search-list]");
        this.searchedItems =  this.searchList.querySelectorAll("[data-searched-item]");
        this.searchQuery = document.getElementById("searchbox");
    }

    searchFilter = () => {
        this.searchQuery.addEventListener('input', (event) => {

            for (let i = 0; i < this.searchedItems.length; i++) {

                if (this.searchedItems[i].innerText.toLowerCase().includes(this.searchQuery.value.toLowerCase())) {
                    this.searchedItems[i].classList.remove("book--hidden");
                } else {
                    this.searchedItems[i].classList.add("book--hidden");
                }

                //this.paginationInstance && this.paginationInstance.resetPagination();
            }
        });
    }
}