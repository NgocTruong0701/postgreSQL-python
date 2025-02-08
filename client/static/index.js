var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import contactsTable from "./table/index.js";
import modalForm from "./modalForm/index.js";
import * as api from "./api/index.js";
const table = new contactsTable();
const modal = new modalForm();
function addCreateButton() {
    var addButton = document.createElement("div");
    addButton.id = "add-button";
    var button = document.createElement("button");
    button.className = "Btn";
    button.innerHTML = `<div class="sign">+</div>
  <div class="text">Nuevo</div>`;
    button.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
        modal.render("create");
    }));
    addButton.appendChild(button);
    document.body.appendChild(addButton);
}
function getContacts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield api.getContacts();
            const titleHeader = document.getElementById("titleHeader");
            if (titleHeader) {
                titleHeader.className = "title";
                console.log("Change clase");
            }
            table.renderContacts(result);
            addCreateButton();
        }
        catch (err) {
            console.error(err);
        }
    });
}
getContacts();
