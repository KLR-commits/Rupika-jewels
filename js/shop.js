let all = [];
let activeCategory = "All";
let searchTerm = "";

fetch("data/products.json")
  .then(r => r.json())
  .then(products => {
    all = products;
    const categories = ["All", ...new Set(products.map(p => p.category).filter(Boolean))].filter((v,i,a) => i===0 || v !== "Jewellery");
    document.querySelector("#filters").innerHTML = categories.map(c =>
      `<button class="filter ${c === "All" ? "active" : ""}" type="button" data-cat="${c}">${c}</button>`
    ).join("");

    document.querySelectorAll(".filter").forEach(button => {
      button.addEventListener("click", () => {
        document.querySelectorAll(".filter").forEach(x => x.classList.remove("active"));
        button.classList.add("active");
        activeCategory = button.dataset.cat;
        render();
      });
    });

    document.querySelector("#search")?.addEventListener("input", e => {
      searchTerm = e.target.value.trim().toLowerCase();
      render();
    });

    render();
  })
  .catch(() => { document.querySelector("#count").textContent = "Catalogue unavailable"; });

function render() {
  let products = activeCategory === "All" ? all : all.filter(p => p.category === activeCategory);
  if (searchTerm) {
    products = products.filter(p => `${p.name} ${p.category} ${p.id}`.toLowerCase().includes(searchTerm));
  }
  document.querySelector("#count").textContent = `${products.length} ${products.length === 1 ? "piece" : "pieces"}`;
  document.querySelector("#shop-grid").innerHTML = products.map(card).join("") ||
    `<div class="empty-state"><h2>No pieces found.</h2><p>Try another search or browse the full catalogue.</p></div>`;
}

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
        <p>Rupika collection · ${p.id}</p>
        <p class="product-description">${p.description}</p>
      </div>
    </a>
  </article>`;
}