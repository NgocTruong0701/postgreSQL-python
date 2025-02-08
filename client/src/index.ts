import contactsTable from "./table/index.js";
import modalForm from "./modalForm/index.js";
import * as api from "./api/index.js"

const table = new contactsTable();
const modal = new modalForm();

function addCreateButton(): void {
  var addButton: HTMLDivElement = document.createElement("div");
  addButton.id = "add-button";
  var button: HTMLButtonElement = document.createElement("button");
  button.className = "Btn";
  button.innerHTML = `<div class="sign">+</div>
  <div class="text">Nuevo</div>`;
  button.addEventListener("click", async () => {
    modal.render("create");
  });
  addButton.appendChild(button);
  document.body.appendChild(addButton);
}

async function getContacts(): Promise<void> {
  try {
      const result: contact[] = await api.getContacts();

      const titleHeader = document.getElementById("titleHeader");
      if(titleHeader) {
        titleHeader.className = "title";
        console.log("Change clase")
      }
      
      table.renderContacts(result);
      addCreateButton();
  } catch (err) {
    console.error(err);
  }
}

getContacts();
