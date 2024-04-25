export function picturesTemplate(data) {
  const photographData = data.shift();

  const section = document.createElement("section");
  generateFiltersBlock(data, section);
  generateFixedBlock(data, section, photographData);
  generatePhotosDiv(data, "Popularité", section);

  return section;
}

function sortPhotos(data, filter) {
  data.sort(function (a, b) {
    if (a[filter] < b[filter]) {
      if (filter == "title") {
        return -1;
      } else return 1;
    }
    if (a[filter] > b[filter]) {
      if (filter == "title") {
        return 1;
      } else return -1;
    }
    return 0;
  });

  return data;
}

function generatePhotosDiv(data, filter, section) {
  const photosContainerDiv = document.querySelector(".photos-container");
  if (photosContainerDiv) {
    photosContainerDiv.remove();
  }

  const photosContainer = document.createElement("div");
  photosContainer.className = "photos-container";

  const photosByFilter = sortPhotos(data, filter);
  let totalLikesText = section.querySelector("#total-likes");

  generatePhotos(photosContainer, photosByFilter, totalLikesText);

  section.appendChild(photosContainer);
}

function generatePhotos(photosContainer, photosByFilter, totalLikesText) {
  let totalLikes = parseInt(totalLikesText.textContent);

  for (let i = 0; i < photosByFilter.length; i++) {
    let { title, image, video, likes } = photosByFilter[i];

    let photoBlock = document.createElement("div");
    photoBlock.className = "photos-container-block";

    let photoTextLine = document.createElement("div");
    photoTextLine.className = "photos-container-text";
    let titleText = document.createElement("p");
    titleText.textContent = title;
    titleText.className = "photos-container-title";

    const photographerName = document.querySelector("h1");
    let mediaLink = document.createElement("button");
    mediaLink.type = "button";
    mediaLink.className = "button-layout";
    mediaLink.setAttribute("name", title + ", closeup view");
    mediaLink.addEventListener("click", function () {
      generateModal(photoBlock, photosByFilter, i);
    });

    if (image) {
      let photoHTML = document.createElement("img");
      photoHTML.src = `assets/photographers/${
        photographerName.textContent.split(" ")[0]
      }/${image}`;
      photoHTML.alt = title;
      photoHTML.className = "photos-container-photo";
      mediaLink.appendChild(photoHTML);
    } else {
      let videoHTML = document.createElement("video");
      videoHTML.src = `assets/photographers/${
        photographerName.textContent.split(" ")[0]
      }/${video}`;
      videoHTML.controls = true;
      videoHTML.muted = false;
      videoHTML.height = 300;
      videoHTML.width = 350;
      mediaLink.appendChild(videoHTML);
    }

    let photoLikesBlock = document.createElement("div");
    photoLikesBlock.className = "photos-container-likes-block";

    let likesText = document.createElement("p");
    likesText.textContent = likes;
    likesText.className = "photos-container-likes";

    let heart = document.createElement("img");
    heart.src = "assets/icons/heart.svg";
    heart.className = "photos-container-heart";
    heart.setAttribute("alt", "likes");
    heart.addEventListener("click", () => {
      likes += 1;
      totalLikes += 1;
      likesText.textContent = likes;
      totalLikesText.textContent = totalLikes;
    });

    photoLikesBlock.appendChild(likesText);
    photoLikesBlock.appendChild(heart);
    photoTextLine.appendChild(titleText);
    photoTextLine.appendChild(photoLikesBlock);
    photoBlock.appendChild(mediaLink);
    photoBlock.appendChild(photoTextLine);
    photosContainer.appendChild(photoBlock);
  }
}

function generateFiltersBlock(data, section) {
  const filterBlock = document.createElement("div");
  filterBlock.className = "photos-filters-block";
  const filterText = document.createElement("label");
  filterText.id = "filters-label";
  filterText.textContent = "Trier par";
  filterText.setAttribute("for", "filters-listbox");
  const filters = document.createElement("div");
  filters.setAttribute("role", "listbox");
  filters.setAttribute("tabindex", 0);
  filters.setAttribute("aria-activedescendant", "filter-likes");
  filters.setAttribute("aria-labelledby", "filters-label");
  filters.className = "photos-filters";
  filters.id = "filters-listbox";
  const filtersArrow = document.createElement("img");
  filtersArrow.src = "assets/icons/arrow-top.svg";
  filtersArrow.setAttribute("data-open", false);
  filtersArrow.setAttribute("role", "button");
  filtersArrow.setAttribute("aria-haspopup", "listbox");
  filtersArrow.setAttribute("aria-expanded", "false");
  filtersArrow.className = "photos-filters-arrow";
  filtersArrow.addEventListener("click", function () {
    deployFilters();
  });
  filters.appendChild(filtersArrow);
  generateFilters(data, section, filters);

  filterBlock.appendChild(filterText);
  filterBlock.appendChild(filters);
  section.appendChild(filterBlock);
}

function generateFilters(data, section, filters) {
  const filter1 = document.createElement("div");
  filter1.textContent = "Popularité";
  filter1.className = "filter";
  filter1.setAttribute("role", "option");
  filter1.setAttribute("data-order", 1);
  filter1.setAttribute("id", "filter-likes");
  filter1.setAttribute("aria-selected", "true");
  const filterHr1 = document.createElement("hr");
  const filter2 = document.createElement("div");
  filter2.textContent = "Date";
  filter2.className = "filter";
  filter2.setAttribute("role", "option");
  filter2.setAttribute("data-order", 2);
  filter2.setAttribute("id", "filter-date");
  filter2.setAttribute("aria-selected", "false");
  const filterHr2 = document.createElement("hr");
  const filter3 = document.createElement("div");
  filter3.textContent = "Titre";
  filter3.className = "filter";
  filter3.setAttribute("role", "option");
  filter3.setAttribute("data-order", 3);
  filter3.setAttribute("id", "filter-title");
  filter3.setAttribute("aria-selected", "false");

  filters.appendChild(filter1);
  filters.appendChild(filterHr1);
  filters.appendChild(filter2);
  filters.appendChild(filterHr2);
  filters.appendChild(filter3);

  filter1.addEventListener("click", function () {
    filterPhotos(data, "likes", section, filter1);
  });
  filter2.addEventListener("click", function () {
    filterPhotos(data, "date", section, filter2);
  });
  filter3.addEventListener("click", function () {
    filterPhotos(data, "title", section, filter3);
  });
}

function deployFilters() {
  const filtersArrow = document.querySelector(".photos-filters-arrow");
  const filters = document.querySelector(".photos-filters");
  if (filtersArrow.dataset.open == "true") {
    filtersArrow.classList.remove("photo-filters-arrow-open");
    filters.classList.remove("photos-filters-open");
    filtersArrow.dataset.open = false;
  } else {
    filtersArrow.classList.add("photo-filters-arrow-open");
    filters.classList.add("photos-filters-open");
    filtersArrow.dataset.open = true;
  }
}

function filterPhotos(data, filter, section, filter) {
  generatePhotosDiv(data, filter, section);
  const filters = section.querySelector(".photos-filters");
  filters.setAttribute("aria-selected", "false");
  filter.setAttribute("aria-selected", "true");

  const filterLikes = section.querySelector("#filter-likes");
  const filterDate = section.querySelector("#filter-date");
  const filterTitle = section.querySelector("#filter-title");

  if (filter == "likes") {
    filterLikes.dataset.order = 1;
    filterDate.dataset.order = 2;
    filterTitle.dataset.order = 3;
  } else if (filter == "date") {
    filterLikes.dataset.order = 2;
    filterDate.dataset.order = 1;
    filterTitle.dataset.order = 3;
  } else {
    filterLikes.dataset.order = 2;
    filterDate.dataset.order = 3;
    filterTitle.dataset.order = 1;
  }

  const filtersArrow = section.querySelector(".photos-filters-arrow");

  filtersArrow.classList.remove("photo-filters-arrow-open");
  filters.classList.remove("photos-filters-open");
  filtersArrow.dataset.open = false;
}

function generateFixedBlock(data, section, photographData) {
  const fixedBlock = document.createElement("div");
  fixedBlock.className = "fixed-block";

  let totalLikes = 0;
  for (let i = 1; i < data.length; i++) {
    totalLikes += data[i].likes;
  }
  const likeNumber = document.createElement("span");
  likeNumber.textContent = totalLikes;
  likeNumber.setAttribute("id", "total-likes");
  const totalHeart = document.createElement("img");
  totalHeart.src = "assets/icons/heart.svg";
  const pricePerDay = document.createElement("span");
  pricePerDay.textContent = photographData.price + "€ / jour";

  fixedBlock.appendChild(likeNumber);
  fixedBlock.appendChild(totalHeart);
  fixedBlock.appendChild(pricePerDay);
  section.appendChild(fixedBlock);
}

function generateModal(photoBlock, photosByFilter, i) {
  let modal = document.createElement("div");
  modal.className = "picture-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-label", "image closeup view");

  let modalContainer = document.createElement("div");
  modalContainer.className = "picture-modal-container";

  let modalPicture = document.createElement("img");
  modalPicture.className = "picture-modal-photo";

  let modalTitle = document.createElement("p");
  modalTitle.className = "photos-container-title";

  generateModalContent(photosByFilter[i], modalPicture, modalTitle);

  let modalLeftArrowButton = document.createElement("button");
  modalLeftArrowButton.type = "button";
  modalLeftArrowButton.name = "Previous image";
  modalLeftArrowButton.className = "button-layout-align-center";
  modalLeftArrowButton.addEventListener("click", () => {
    i -= 1;
    if (i < 0) {
      i = photosByFilter.length - 1;
    }
    if (JSON.stringify(photosByFilter[i]).includes("video")) {
      i -= 1;
      if (i < 0) {
        i = photosByFilter.length - 1;
      }
    }
    generateModalContent(photosByFilter[i], modalPicture, modalTitle);
  });

  let modalLeftArrow = document.createElement("img");
  modalLeftArrow.src = "assets/icons/modal-arrow.svg";
  modalLeftArrow.alt = "Previous image";
  modalLeftArrow.className = "picture-modal-left-arrow";

  let modalRightBlock = document.createElement("div");
  modalRightBlock.className = "picture-modal-right-block";

  let modalRightArrowButton = document.createElement("button");
  modalRightArrowButton.type = "button";
  modalRightArrowButton.name = "Next image";
  modalRightArrowButton.className = "button-layout";
  modalRightArrowButton.addEventListener("click", () => {
    i += 1;
    if (i >= photosByFilter.length) {
      i = 0;
    }
    if (JSON.stringify(photosByFilter[i]).includes("video")) {
      i += 1;
      if (i >= photosByFilter.length) {
        i = 0;
      }
    }
    generateModalContent(photosByFilter[i], modalPicture, modalTitle);
  });

  document.onkeydown = function (e) {
    switch (e.keyCode) {
      case 37:
        //left arrow
        i += 1;
        if (i >= photosByFilter.length) {
          i = 0;
        }
        if (JSON.stringify(photosByFilter[i]).includes("video")) {
          i += 1;
          if (i >= photosByFilter.length) {
            i = 0;
          }
        }
        generateModalContent(photosByFilter[i], modalPicture, modalTitle);
        break;
      case 39:
        //right arrow
        i -= 1;
        if (i < 0) {
          i = photosByFilter.length - 1;
        }
        if (JSON.stringify(photosByFilter[i]).includes("video")) {
          i -= 1;
          if (i < 0) {
            i = photosByFilter.length - 1;
          }
        }
        generateModalContent(photosByFilter[i], modalPicture, modalTitle);
        break;
    }
  };

  let modalRightArrow = document.createElement("img");
  modalRightArrow.src = "assets/icons/modal-arrow.svg";
  modalRightArrow.alt = "Next image";
  modalRightArrow.className = "picture-modal-right-arrow";

  let modalCrossButton = document.createElement("button");
  modalCrossButton.type = "button";
  modalCrossButton.name = "Close dialog";
  modalCrossButton.className = "button-layout";
  modalCrossButton.addEventListener("click", () => {
    modal.style.display = "none";
  });
  let modalCross = document.createElement("img");
  modalCross.src = "assets/icons/modal-cross.svg";
  modalCross.alt = "Close dialog";
  modalCross.className = "picture-modal-cross";

  modalLeftArrowButton.appendChild(modalLeftArrow);
  modal.appendChild(modalLeftArrowButton);
  modalContainer.appendChild(modalPicture);
  modalContainer.appendChild(modalTitle);
  modal.appendChild(modalContainer);
  modalCrossButton.appendChild(modalCross);
  modalRightBlock.appendChild(modalCrossButton);
  modalRightArrowButton.appendChild(modalRightArrow);
  modalRightBlock.appendChild(modalRightArrowButton);
  modal.appendChild(modalRightBlock);
  photoBlock.appendChild(modal);
}

function generateModalContent(photosByFilter, modalPicture, modalTitle) {
  const photographerName = document.querySelector("h1");
  const { title, image } = photosByFilter;

  modalPicture.src = `assets/photographers/${
    photographerName.textContent.split(" ")[0]
  }/${image}`;
  modalPicture.alt = title;
  modalTitle.textContent = title;
}
