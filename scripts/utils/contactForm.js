function displayModal() {
  const modal = document.getElementById("contact_modal");
  const closeButton = modal.getElementById("contact_modal_close");
  modal.style.display = "flex";
  closeButton.focus();

  const form = modal.querySelector("form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    postForm(form);
    closeModal();
  });
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

function postForm(form) {
  const inputs = form.querySelectorAll("input");
  for (let i = 0; i < inputs.length; i++) {
    console.log(inputs[i].value);
    inputs[i].value = "";
  }
}
