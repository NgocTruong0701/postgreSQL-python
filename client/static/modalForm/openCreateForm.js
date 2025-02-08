import { generateCloseButton } from "./generateCloseButton.js";
import { generateCreateForm } from "./generateCreateForm.js";
export function openCreateForm() {
    var closeButton = generateCloseButton();
    var createForm = generateCreateForm();
    var modalForm = document.getElementById("modal-form");
    if (modalForm == null)
        throw new Error("modal-form is null");
    if (modalForm.innerHTML.trim() == "") {
        modalForm.className = "visible-modal";
        modalForm.appendChild(closeButton);
        modalForm.appendChild(createForm);
    }
    else {
        console.log(modalForm.innerHTML);
    }
}
