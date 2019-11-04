var checkBoxes = document.querySelectorAll("input[type=checkbox]");
var hiddenBooleans = document.querySelectorAll("input[type=hidden]");
var textInputs = document.querySelectorAll(".text-input"); 

debugger;

// enable populated fields and checkboxes 
hiddenBooleans.forEach((hiddenBoolean, i) => {
    if (hiddenBoolean.value === "true"){
        checkBoxes[i].disabled = false;
        checkBoxes[i].checked = true;
        textInputs[i].disabled = false;
    } 

});

// checkbox event listeners
checkBoxes.forEach((checkBox, i) => {
    checkBox.addEventListener("change", () => {

        // update hidden boolean value
        hiddenBooleans[i].value = checkBox.checked;
        // set status of associated text input
        textInputs[i].disabled = !checkBox.checked;

    });
});