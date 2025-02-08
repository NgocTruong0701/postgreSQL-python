var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createContact } from "../api/createContact.js";
export default class modalForm {
    constructor() {
        this.formDiv = document.createElement("div");
        this.loadingShade = document.createElement("div");
        this.title = document.createElement("div");
        this.form = document.createElement("form");
        this.submitButton = document.createElement("button");
        this.modalFormDiv = document.getElementById("modal-form");
        console.log('createContact function:', createContact);
    }
    setModalVisibility(visibility) {
        this.modalFormDiv.className = visibility ? "visible-modal" : "hidden-modal";
    }
    render(type, contact) {
        if (type == "create") {
            const title = "Nuevo contacto";
            const formItems = [
                this.generateInputTextForm("name", "Nombre"),
                this.generateInputTextForm("phone", "Numero", "tel"),
                this.generateInputTextForm("email", "Correo", "email"),
            ];
            this.generateForm(title, formItems);
            if (this.modalFormDiv.innerHTML.trim() == "") {
                this.setModalVisibility(true);
                this.modalFormDiv.appendChild(this.generateCloseButton());
                this.modalFormDiv.appendChild(this.formDiv);
            }
            else {
                console.error("modalFormDiv was ready");
            }
        }
        if (type == "edit") {
            const title = "Editar contacto";
            const formItems = [
                this.generateInputTextForm("name", "Nombre", "text", contact && contact[1]),
                this.generateInputTextForm("phone", "Numero", "tel", contact && contact[2]),
                this.generateInputTextForm("email", "Correo", "email", contact && contact[3]),
            ];
            this.generateForm(title, formItems);
            if (this.modalFormDiv.innerHTML.trim() == "") {
                this.setModalVisibility(true);
                this.modalFormDiv.appendChild(this.generateCloseButton());
                this.modalFormDiv.appendChild(this.formDiv);
            }
            else {
                console.error("modalFormDiv was ready");
            }
        }
    }
    generateCloseButton() {
        const button = document.createElement("button");
        button.className = "close-button";
        button.innerHTML = `<span class="X"></span><span class="Y"></span>`;
        button.addEventListener("click", () => {
            console.log("Close create modal");
            const modalForm = document.getElementById("modal-form");
            if (modalForm == null)
                throw new Error("modal-form is null");
            console.log("change class");
            modalForm.className = "hidden-modal";
            modalForm.innerHTML = "";
        });
        return button;
    }
    generateForm(title, formItems) {
        this.formDiv.className = "card__front";
        this.loadingShade.id = "loading-shade";
        this.loadingShade.className = "loading-shade-create-form hidden";
        this.loadingShade.innerHTML = `<div class="loader">
      <li class="ball"></li>
      <li class="ball"></li>
      <li class="ball"></li>
    </div>`;
        this.title.textContent = title;
        this.title.className = "title";
        this.form.className = "card__form";
        this.form.innerHTML = "";
        formItems.forEach((input) => {
            this.form.appendChild(input);
        });
        this.submitButton.textContent = "Guardar";
        this.submitButton.className = "card__btn";
        this.submitButton.type = "submit";
        this.form.appendChild(this.submitButton);
        // Bind this context for submitCreateForm
        this.form.addEventListener("submit", this.submitCreateForm.bind(this));
        this.formDiv.appendChild(this.title);
        this.formDiv.appendChild(this.form);
        this.formDiv.appendChild(this.loadingShade);
    }
    submitCreateForm(ev) {
        return __awaiter(this, void 0, void 0, function* () {
            ev.preventDefault();
            this.loadingShade.className = "loading-shade-create-form";
            console.log('Sending data...');
            try {
                const formData = new FormData(this.form);
                const newContact = {
                    name: formData.get('name'),
                    phone: formData.get('phone'),
                    email: formData.get('email')
                };
                console.log('Sending data:', newContact);
                const createdContact = yield createContact(newContact);
                console.log('Contact created:', createdContact);
                // Hide modal
                if (this.modalFormDiv == null)
                    throw new Error("modal-form is null");
                this.modalFormDiv.className = "hidden-modal";
                this.modalFormDiv.innerHTML = "";
                // Refresh contact list
                // TODO: Add function to refresh list
            }
            catch (error) {
                console.error('Failed to create contact:', error);
                // Show error message to user
            }
            finally {
                this.loadingShade.className = "loading-shade-create-form hidden";
            }
        });
    }
    generateInputTextForm(name, placeholder, type = "text", defaultValue = "") {
        const inputText = document.createElement("input");
        inputText.className = "card__input";
        inputText.name = name;
        inputText.placeholder = placeholder;
        inputText.type = type;
        inputText.value = defaultValue;
        return inputText;
    }
}
