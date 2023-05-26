export default class Filter {
    constructor() {
        this.buttonName = document.querySelector("#name-button");
        this.buttonDate = document.querySelector("#date-button")
        this.elementList = Array.from(document.querySelectorAll(".booksList .book"));

        this.buttonDate.addEventListener("click", function() {
            this.elementList.sort(function(a, b) {

            })
        })
        console.log(this.elementList);
    }
}