export function generateCloseButton() {
    var button = document.createElement("button");
    button.className = "close-button";
    button.innerHTML = `<span class="X"></span><span class="Y"></span>`;
    button.addEventListener("click", () => {
        console.log("Close create modal");
        var modalForm = document.getElementById("modal-form");
        if (modalForm == null)
            throw new Error("modal-form is null");
        console.log("change class");
        modalForm.className = "hidden-modal";
        modalForm.innerHTML = "";
    });
    return button;
}
