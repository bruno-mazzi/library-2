export default class Pagination {

    // basé sur https://webdesign.tutsplus.com/tutorials/pagination-with-vanilla-javascript--cms-41896

    constructor() {

        this.paginatedList = document.querySelector(".booksList");
        this.listItems = this.paginatedList.querySelectorAll(".book");
        this.nextButton = document.getElementById("next-button");
        this.prevButton = document.getElementById("prev-button");
        this.paginationNumbers = document.getElementById("pagination__numbers");
        this.pageNumber = document.createElement("button");

        this.paginationLimit = 9;
        this.pageCount = Math.ceil(this.listItems.length / this.paginationLimit);
        let currentPage;

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
        pageNumber.className = "pagination__number";
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

        const prevRange = (pageNum - 1) * this.paginationLimit;
        const currRange = pageNum * this.paginationLimit;

        this.listItems.forEach((item, index) => {
            item.classList.add("book--hidden");
            if (index >= prevRange && index < currRange) {
                item.classList.remove("book--hidden");
            }
        });
    };

    handleActivePageNumber = () => {
        document.querySelectorAll(".pagination__number").forEach((button) => {
            button.classList.remove("pagination__number--active");
            const pageIndex = Number(button.getAttribute("page-index"));

            if (pageIndex == this.currentPage) {
                button.classList.add("pagination__number--active");
            }
        });
    };

    disableButton = (button) => {
        button.classList.add("pagination__number--disabled");
        button.setAttribute("disabled", true);
    };

    enableButton = (button) => {
        button.classList.remove("pagination__number--disabled");
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