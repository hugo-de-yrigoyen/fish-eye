async function getPhotographers() {
  let photographers = [];

  return fetch("https://hugo-de-yrigoyen.github.io/fish-eye/data/photographers.json")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      photographers = [...value.photographers];
      return photographers;
    })
    .catch(function (err) {
      console.log(err);
    });
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");
  for (let i=0; i< photographers.length; i++) {
    const photographerModel = photographersTemplate(photographers[i], i);
    photographersSection.appendChild(photographerModel);
  }
}

async function init() {
  // Récupère les datas des photographes
  const photographers = await getPhotographers();
  await displayData(photographers);
}

init();
