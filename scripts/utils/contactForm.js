function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "flex";

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
  inputs = form.querySelectorAll("input");
  for (let i = 0; i < inputs.length; i++) {
    console.log(inputs[i].value);
    inputs[i].value = "";
  }
}
