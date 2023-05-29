
const PAGINATION_LIMIT = 9;

export default class Pagination {

    // basé sur https://webdesign.tutsplus.com/tutorials/pagination-with-vanilla-javascript--cms-41896

    paginatedList = null;
    listItems = null;
    nextButton = null;
    prevButton = null;
    paginationNumbers = null;
    pageCount = null;
    currentPage = null;

    constructor() {

        this.paginatedList = document.querySelector("[data-paginated]");
        this.listItems = this.paginatedList.querySelectorAll(".book");
        this.nextButton = document.getElementById("next-button");
        this.prevButton = document.getElementById("prev-button");
        this.paginationNumbers = document.querySelector(".pagination__numbers");
        this.pageCount = Math.ceil(this.listItems.length / PAGINATION_LIMIT);

        document.querySelector(".pagination").style.display = 'block';
        this.getPaginationNumbers();
        this.setCurrentPage(1);

        document.querySelectorAll(".pagination__number").forEach((button) => {
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

        this.prevButton.addEventListener("click", () => {
            this.setCurrentPage(this.currentPage - 1);
        });

        this.nextButton.addEventListener("click", () => {
            this.setCurrentPage(this.currentPage + 1);
        });

        const prevRange = (pageNum - 1) * PAGINATION_LIMIT;
        const currRange = pageNum * PAGINATION_LIMIT;

        this.listItems.forEach((item, index) => {
            item.classList.add("book--hidden");
            if (index >= prevRange && index < currRange) {
                item.classList.remove("book--hidden");
            }
        });
    };

    handleActivePageNumber = () => {
        document.querySelectorAll(".pagination__number").forEach((button) => {
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