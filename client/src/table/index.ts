import modalForm from "../modalForm/index.js";
import * as api from "../api/index.js"
import { formatPhone } from "../util/formatPhone.js";

export default class contactsTable {
  table: HTMLTableElement;
  active: boolean;
  modal: modalForm;
  

  constructor() {
    this.active = false;
    this.table = <HTMLTableElement>document.getElementById("contacts_table");
    this.modal = new modalForm();
  }

  private columns: columnDefinition[] = [
    {
      className: "fav-col",
      text: "",
    },
    {
      className: "name-col",
      text: "Nombre",
    },
    {
      className: "phone-col",
      text: "Numero",
    },
    {
      className: "email-col",
      text: "Correo",
    },
    {
      className: "edit-col",
      text: "",
    },
    {
      className: "delete-col",
      text: "",
    },
  ];

  private addHeader() {
    this.active = true;
    var header: HTMLTableSectionElement | HTMLTableSectionElement | null =
      this.table.tHead;
    if (header == null) {
      header = this.table.createTHead();
    }

    var headerContent = document.createElement("tr");
    this.columns.forEach((col: columnDefinition) => {
      var newCol: HTMLTableCellElement = document.createElement("th");
      newCol.className = col.className;
      newCol.textContent = col.text;
      headerContent.appendChild(newCol);
    });

    header.appendChild(headerContent);
  }

  public renderContact(contactToAdd: contact, position: number = -1) {
    //If the table isn't active load header
    if (!this.active) this.addHeader();

    // Insert a new row at the end of the table
    var tableBodies: HTMLCollectionOf<HTMLTableSectionElement> =
      this.table.tBodies;
    // Check if the table has a tbody, create one if not
    if (tableBodies.length === 0) {
      this.table.createTBody();
    }

    // Get the reference to the tbody and add new row
    var newRow: HTMLTableRowElement = this.table.tBodies[0].insertRow(position);
    //var tbody = table.tBodies[0];
    var indexRow = newRow.rowIndex;

    //Set id at the new row
    newRow.id = `row-${indexRow}`;
    newRow.accessKey = `contact-${contactToAdd[0]}`;

    // Insert cells into the new row
    var fav: HTMLTableCellElement = newRow.insertCell(0);
    var name: HTMLTableCellElement = newRow.insertCell(1);
    var phone: HTMLTableCellElement = newRow.insertCell(2);
    var email: HTMLTableCellElement = newRow.insertCell(3);
    var edit: HTMLTableCellElement = newRow.insertCell(4);
    var deleteCell: HTMLTableCellElement = newRow.insertCell(5);

    // Set class name
    edit.className = "edit-cell";
    deleteCell.className = "delete-cell";

    // Fav button
    var favLabel: HTMLLabelElement = document.createElement("label");
    favLabel.className = "star-button";
    var favInput: HTMLInputElement = document.createElement("input");
    favInput.type = "checkbox";
    favInput.id = "fav-" + contactToAdd[0];
    favInput.defaultChecked = contactToAdd[4];

    function handleCheckChange(this: HTMLInputElement, ev: Event) {
      ev.preventDefault();
      console.log("change", this.checked, "id:", contactToAdd[0]);
      api.setFav(contactToAdd[0], this.checked)
    }

    favLabel.appendChild(favInput);
    favLabel.innerHTML = favLabel.innerHTML + ` <svg height="24px" id="Layer_1" version="1.2" viewBox="0 0 24 24" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><g><path d="M9.362,9.158c0,0-3.16,0.35-5.268,0.584c-0.19,0.023-0.358,0.15-0.421,0.343s0,0.394,0.14,0.521    c1.566,1.429,3.919,3.569,3.919,3.569c-0.002,0-0.646,3.113-1.074,5.19c-0.036,0.188,0.032,0.387,0.196,0.506    c0.163,0.119,0.373,0.121,0.538,0.028c1.844-1.048,4.606-2.624,4.606-2.624s2.763,1.576,4.604,2.625    c0.168,0.092,0.378,0.09,0.541-0.029c0.164-0.119,0.232-0.318,0.195-0.505c-0.428-2.078-1.071-5.191-1.071-5.191    s2.353-2.14,3.919-3.566c0.14-0.131,0.202-0.332,0.14-0.524s-0.23-0.319-0.42-0.341c-2.108-0.236-5.269-0.586-5.269-0.586    s-1.31-2.898-2.183-4.83c-0.082-0.173-0.254-0.294-0.456-0.294s-0.375,0.122-0.453,0.294C10.671,6.26,9.362,9.158,9.362,9.158z"></path></g></g></svg>`;

    fav.appendChild(favLabel);

    document.getElementById("fav-" + contactToAdd[0])?.addEventListener("change", handleCheckChange)
    //console.log()
/*     fav.innerHTML = `<label class="star-button">
  <input type="checkbox">
  <svg height="24px" id="Layer_1" version="1.2" viewBox="0 0 24 24" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><g><path d="M9.362,9.158c0,0-3.16,0.35-5.268,0.584c-0.19,0.023-0.358,0.15-0.421,0.343s0,0.394,0.14,0.521    c1.566,1.429,3.919,3.569,3.919,3.569c-0.002,0-0.646,3.113-1.074,5.19c-0.036,0.188,0.032,0.387,0.196,0.506    c0.163,0.119,0.373,0.121,0.538,0.028c1.844-1.048,4.606-2.624,4.606-2.624s2.763,1.576,4.604,2.625    c0.168,0.092,0.378,0.09,0.541-0.029c0.164-0.119,0.232-0.318,0.195-0.505c-0.428-2.078-1.071-5.191-1.071-5.191    s2.353-2.14,3.919-3.566c0.14-0.131,0.202-0.332,0.14-0.524s-0.23-0.319-0.42-0.341c-2.108-0.236-5.269-0.586-5.269-0.586    s-1.31-2.898-2.183-4.83c-0.082-0.173-0.254-0.294-0.456-0.294s-0.375,0.122-0.453,0.294C10.671,6.26,9.362,9.158,9.362,9.158z"></path></g></g></svg>
</label>`; */

    name.innerHTML = contactToAdd[1];
    phone.innerHTML = formatPhone(contactToAdd[2]);
    email.innerHTML = contactToAdd[3];

    // Edit button
    const editButton = document.createElement("button");
    editButton.className = "edit-button";
    editButton.innerHTML = `<svg class="edit-svgIcon" viewBox="0 0 512 512">
    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
  </svg>`;

    const modalController: modalForm = this.modal;

    function handleEdit(this: HTMLButtonElement, ev: MouseEvent) {
      ev.preventDefault();
      console.log("Edit:", contactToAdd);
      modalController.render("edit", contactToAdd);
      
    }

    editButton.addEventListener("click", handleEdit);
    edit.appendChild(editButton);

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.innerHTML = `<svg class="edit-svgIcon" viewBox="0 0 448 512" class="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>`;

    function handleDelete(this: HTMLButtonElement, ev: MouseEvent) {
      ev.preventDefault();
      console.log("Delete:", contactToAdd);
      api.deleteContact(contactToAdd[0]).then(()=>{
        console.log("Deleted!");
        newRow.remove();
      })
    }

    deleteButton.addEventListener("click", handleDelete);
    deleteCell.appendChild(deleteButton);
  }

  public renderContacts(contacts: contact[]) {
    contacts.forEach((contact) => {
      this.renderContact(contact);
    });
  }
}
