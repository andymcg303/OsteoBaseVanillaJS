let checkBoxes = document.querySelectorAll("input[type=checkbox]");
let hiddenBooleans = document.querySelectorAll("input[type=hidden]");
let textInputs = document.querySelectorAll(".text-input"); 

checkBoxes.forEach((checkBox, i) => {
    checkBox.addEventListener("change", () => {

        // update hidden boolean value
        hiddenBooleans[i].value = checkBox.checked;
        // set status of associated text input
        textInputs[i].disabled = !checkBox.checked;

    });
});
