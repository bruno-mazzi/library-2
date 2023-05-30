
export default class Pagination {

    // basé sur https://webdesign.tutsplus.com/tutorials/pagination-with-vanilla-javascript--cms-41896

    paginatedList = null;
    listItems = null;
    nextButton = null;
    prevButton = null;
    paginationNumbers = null;
    pageCount = null;
    currentPage = null;

    constructor( name, limit ) {

        this.limit = limit;
        this.name = name;

        this.paginatedList = document.querySelector("[data-paginator=" + this.name +"]");
        this.listItems = this.paginatedList.querySelectorAll("[data-paginated]");
        this.nextButton = document.querySelector("[data-next]");
        this.prevButton = document.querySelector("[data-prev]");
        this.paginationNumbers = document.querySelector("[data-numbers]");
        this.pageCount = Math.ceil(this.listItems.length / this.limit);

        this.getPaginationNumbers();
        this.setCurrentPage(1);
        this.createLink();
        this.initPagination();
    }

    initPagination = () => {
        document.querySelector(".pagination").style.display = 'block';

        this.prevButton.addEventListener("click", () => {
            this.setCurrentPage(this.currentPage - 1);

            console.log(this.currentPage);
        });

        this.nextButton.addEventListener("click", () => {
            this.setCurrentPage(this.currentPage + 1);

            console.log(this.currentPage);
        });

    }

    createLink = () => {
        document.querySelectorAll("[page-index]").forEach((button) => {
            const pageIndex = Number(button.getAttribute("page-index"));

            if (pageIndex) {
                button.addEventListener("click", () => {
                    this.setCurrentPage(pageIndex);
                });
            }
        });
    }

    appendPageNumber = (index) => {
        const pageNumber = document.createElement("button");
        pageNumber.className = "pagination__number btn btn--secondary";
        pageNumber.innerHTML = index;
        pageNumber.setAttribute("page-index", index);
        pageNumber.setAttribute("aria-label", "Page " + index);
        this.paginationNumbers.appendChild(pageNumber);
    };

    getPaginationNumbers = () => {
        for (let i = 1; i <= this.pageCount; i++) {
            this.appendPageNumber(i);
        }
    };

    setCurrentPage = (pageNum) => {
        this.currentPage = pageNum;

        this.handleActivePageNumber();
        this.handlePageButtonsStatus();

        const prevRange = (pageNum - 1) * this.limit;
        const currRange = pageNum * this.limit;

        this.listItems.forEach((item, index) => {
            item.classList.add("book--hidden");
            if (index >= prevRange && index < currRange) {
                item.classList.remove("book--hidden");
            }
        });
    };

    handleActivePageNumber = () => {
        document.querySelectorAll("[page-index]").forEach((button) => {
            button.classList.remove("btn--tertiary");
            const pageIndex = Number(button.getAttribute("page-index"));

            if (pageIndex == this.currentPage) {
                button.classList.add("btn--tertiary");
            }
        });
    };

    disableButton = (button) => {
        button.classList.add("btn--disabled");
        button.setAttribute("disabled", true);
    };

    enableButton = (button) => {
        button.classList.remove("btn--disabled");
        button.removeAttribute("disabled");
    };

    handlePageButtonsStatus = () => {
        if (this.currentPage === 1) {
            this.disableButton(this.prevButton);
        } else {
            this.enableButton(this.prevButton);
        }

        if (this.pageCount === this.currentPage) {
            this.disableButton(this.nextButton);
        } else {
            this.enableButton(this.nextButton);
        }
    };

}