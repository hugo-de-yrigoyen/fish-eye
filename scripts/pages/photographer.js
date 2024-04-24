import {profileTemplate} from '../templates/template-profile.js'
import {picturesTemplate} from '../templates/template-pictures.js'

async function getPhotographer() {
  let photographerData = [];

  return fetch("https://hugo-de-yrigoyen.github.io/fish-eye/data/photographers.json")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      const url = new URL(window.location.href);
      const id = new URLSearchParams(url.search).get("id");

      for (let i = 0; i < value.photographers.length; i++) {
        if (value.photographers[i].id == id) {
          photographerData.push(value.photographers[i]);
        }
      }
      for (let i = 0; i < value.media.length; i++) {
        if (value.media[i].photographerId == id) {
          photographerData.push(value.media[i]);
        }
      }
      return photographerData;
    })
    .catch(function (err) {
      console.log(err);
    });
}

async function displayData(photographerData) {
  const main = document.querySelector("#main");
  const photographerProfile = profileTemplate(photographerData);
  const photographerPhotos = picturesTemplate(photographerData);
  main.appendChild(photographerProfile);
  main.appendChild(photographerPhotos);
}

async function init() {
  const photographerData = await getPhotographer();

  await displayData(photographerData);
}

init();
