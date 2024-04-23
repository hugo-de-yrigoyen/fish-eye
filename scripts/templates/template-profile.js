export function profileTemplate(data) {
    const { name, portrait, city, country, tagline } = data[0];

    const picture = `assets/photographers/${portrait}`;
    const photographBanner = document.querySelector(".photograph-banner");

    const contact_modal_h2 = document.querySelector("h1");
    contact_modal_h2.textContent += " " + name;

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.className = "photographer-picture";
    img.alt = name;

    const h1 = document.createElement("h1");
    h1.textContent = name;

    const location = document.createElement("p");
    location.textContent = city + ", " + country;
    location.className = "photograph-city";

    const taglineText = document.createElement("p");
    taglineText.textContent = tagline;
    taglineText.className = "photograph-tagline";

    const photographBlock = document.createElement("div");
    photographBlock.className = "photograph-block";

    photographBlock.appendChild(h1);
    photographBlock.appendChild(location);
    photographBlock.appendChild(taglineText);
    photographBanner.appendChild(photographBlock);
    photographBanner.appendChild(img);

    return photographBanner;
}
