const value = document.querySelector("#value");
const buttons = document.querySelectorAll(".btn");

let counter = 0;

buttons.forEach(button => {
    button.addEventListener("click", function(e) {
        const action = e.target.classList;
        
        if (action.contains("decrease")) {
            counter--;
        } else if (action.contains("increase")) {
            counter++;
        } else if (action.contains("reset")) {
            counter = 0;
        }

        value.textContent = counter;

        if (counter < 0) {
            value.style.color = "red";
        } else if (counter > 0) {
            value.style.color = "green";
        } else {
            value.style.color = "#222";
        }
    });
});