import { createContact } from "../api/createContact.js";

interface contactBase {
  name: string;
  phone: string;
  email: string;
}

type contact = [number, string, string, string, boolean];
type modalType = "create" | "edit";

export default class modalForm {
  formDiv: HTMLDivElement;
  loadingShade: HTMLDivElement;
  title: HTMLDivElement;
  form: HTMLFormElement;
  submitButton: HTMLButtonElement;
  modalFormDiv: HTMLDivElement;

  constructor() {
    this.formDiv = document.createElement("div");
    this.loadingShade = document.createElement("div");
    this.title = document.createElement("div");
    this.form = document.createElement("form");
    this.submitButton = document.createElement("button");
    this.modalFormDiv = <HTMLDivElement>document.getElementById("modal-form");
    console.log('createContact function:', createContact);
  }

  setModalVisibility(visibility: boolean) {
    this.modalFormDiv.className = visibility ? "visible-modal" : "hidden-modal";
  }

  render(type: modalType, contact?: contact) {
    if (type == "create") {
      const title: string = "Nuevo contacto";
      const formItems: HTMLInputElement[] = [
        this.generateInputTextForm("name", "Nombre"),
        this.generateInputTextForm("phone", "Numero", "tel"),
        this.generateInputTextForm("email", "Correo", "email"),
      ];

      this.generateForm(title, formItems);

      if (this.modalFormDiv.innerHTML.trim() == "") {
        this.setModalVisibility(true);
        this.modalFormDiv.appendChild(this.generateCloseButton());
        this.modalFormDiv.appendChild(this.formDiv);
      } else {
        console.error("modalFormDiv was ready");
      }
    }

    if (type == "edit") {
      const title: string = "Editar contacto";
      const formItems: HTMLInputElement[] = [
        this.generateInputTextForm("name", "Nombre", "text", contact && contact[1]),
        this.generateInputTextForm("phone", "Numero", "tel", contact && contact[2]),
        this.generateInputTextForm("email", "Correo", "email", contact && contact[3]),
      ];

      this.generateForm(title, formItems);
      
      if (this.modalFormDiv.innerHTML.trim() == "") {
        this.setModalVisibility(true);
        this.modalFormDiv.appendChild(this.generateCloseButton());
        this.modalFormDiv.appendChild(this.formDiv);
      } else {
        console.error("modalFormDiv was ready");
      }
    }
  }

  private generateCloseButton(): HTMLButtonElement {
    const button: HTMLButtonElement = document.createElement("button");
    button.className = "close-button";
    button.innerHTML = `<span class="X"></span><span class="Y"></span>`;

    button.addEventListener("click", () => {
      console.log("Close create modal");
      const modalForm: HTMLElement | null = document.getElementById("modal-form");
      if (modalForm == null) throw new Error("modal-form is null");
      console.log("change class");
      modalForm.className = "hidden-modal";
      modalForm.innerHTML = "";
    });
    return button;
  }

  private generateForm(title: string, formItems: HTMLInputElement[]) {
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

    formItems.forEach((input: HTMLInputElement) => {
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

  private async submitCreateForm(ev: SubmitEvent) {
    ev.preventDefault();

    this.loadingShade.className = "loading-shade-create-form";
    console.log('Sending data...');

    try {
      const formData = new FormData(this.form);
      const newContact: contactBase = {
        name: formData.get('name') as string,
        phone: formData.get('phone') as string,
        email: formData.get('email') as string
      };

      console.log('Sending data:', newContact);
      const createdContact = await createContact(newContact);
      console.log('Contact created:', createdContact);

      // Hide modal
      if (this.modalFormDiv == null) throw new Error("modal-form is null");
      this.modalFormDiv.className = "hidden-modal";
      this.modalFormDiv.innerHTML = "";

      // Refresh contact list
      // TODO: Add function to refresh list

    } catch (error) {
      console.error('Failed to create contact:', error);
      // Show error message to user
    } finally {
      this.loadingShade.className = "loading-shade-create-form hidden";
    }
  }

  private generateInputTextForm(
    name: string,
    placeholder: string,
    type: string = "text",
    defaultValue: string = ""
  ): HTMLInputElement {
    const inputText: HTMLInputElement = document.createElement("input");
    inputText.className = "card__input";
    inputText.name = name;
    inputText.placeholder = placeholder;
    inputText.type = type;
    inputText.value = defaultValue;
    return inputText;
  }
}