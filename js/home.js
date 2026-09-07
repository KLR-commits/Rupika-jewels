fetch("data/products.json")
  .then(r => r.json())
  .then(products => {
    const featured = products.filter(p => p.featured).slice(0,8);
    document.querySelector("#featured").innerHTML = featured.map(card).join("");
  })
  .catch(() => { document.querySelector("#featured").innerHTML = "<p>Catalogue unavailable. Please try again.</p>"; });

function card(p) {
  return `<article class="product-card">
    <a href="product.html?id=${encodeURIComponent(p.id)}">
      <div class="product-media">
        <img loading="lazy" decoding="async" src="${p.image}" alt="${p.name}">
        <span class="product-tag">RUPIKA JEWELS</span>
        <span class="heart" role="button" tabindex="0" aria-label="Save ${p.name}">♡</span>
      </div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <p>Rupika collection · ${p.category}</p>
        <p class="product-description">${p.description}</p>
      </div>
    </a>
  </article>`;
}