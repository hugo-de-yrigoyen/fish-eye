function photographersTemplate(data, i) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    const link = document.createElement( 'a' );
    link.setAttribute("title", name);
    link.setAttribute("href", "/photographer.html?id=" + id);
    link.dataset.keyboardOrder = i;
    const article = document.createElement( 'article' );
    const img = document.createElement( 'img' );
    img.setAttribute("src", picture)
    img.className = "photographer-picture"
    img.alt = name;
    const h2 = document.createElement( 'h2' );
    h2.textContent = name;
    const h3 = document.createElement( 'h3' );
    h3.textContent = city + ", " + country;
    const taglineText = document.createElement( 'p' );
    taglineText.textContent = tagline;
    taglineText.className = "tagline";
    const pricePerDay = document.createElement( 'p' );
    pricePerDay.className = "price";
    pricePerDay.textContent = price + "€/jour";
    link.appendChild(img);
    link.appendChild(h2);
    article.appendChild(link);
    article.appendChild(h3);
    article.appendChild(taglineText);
    article.appendChild(pricePerDay);
    
    return article
}