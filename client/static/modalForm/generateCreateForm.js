function generateInputTextForm(name, placeholder, type = "text", defaultValue = "") {
    var inputText = document.createElement("input");
    inputText.className = "card__input";
    inputText.name = name;
    inputText.placeholder = placeholder;
    inputText.type = type;
    inputText.value = defaultValue;
    return inputText;
}
export function generateCreateForm() {
    var formDiv = document.createElement("div");
    formDiv.className = "card__front";
    var loadingShade = document.createElement("div");
    loadingShade.id = "loading-shade";
    loadingShade.className = "loading-shade-create-form hidden";
    loadingShade.innerHTML = `<div class="loader">
  <li class="ball"></li>
  <li class="ball"></li>
  <li class="ball"></li>
</div>`;
    var title = document.createElement("div");
    title.textContent = "Nuevo contacto";
    title.className = "title";
    var form = document.createElement("form");
    form.className = "card__form";
    // Name field
    form.appendChild(generateInputTextForm("name", "Nombre"));
    // Number field
    form.appendChild(generateInputTextForm("number", "Numero", "tel"));
    // Email field
    form.appendChild(generateInputTextForm("email", "Correo", "email"));
    // Save button
    var saveButton = document.createElement("button");
    saveButton.textContent = "Guardar";
    saveButton.className = "card__btn";
    saveButton.type = "submit";
    form.appendChild(saveButton);
    function submitCreateForm(ev) {
        ev.preventDefault();
        console.log("Submit Create Form");
        var loading = document.getElementById("loading-shade");
        if (loading == null)
            throw new Error("Not loading shade loaded.");
        loading.className = "loading-shade-create-form";
    }
    // Form submit
    form.addEventListener("submit", submitCreateForm);
    formDiv.appendChild(title);
    formDiv.appendChild(form);
    formDiv.appendChild(loadingShade);
    return formDiv;
}
