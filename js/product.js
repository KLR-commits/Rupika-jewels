fetch("data/products.json")
  .then(r => r.json())
  .then(ps => {
    const id = new URLSearchParams(location.search).get("id");
    const p = ps.find(x => x.id === id) || ps[0];
    document.title = `${p.name} — Rupika Jewels`;
    document.querySelector("#product").innerHTML = `
      <div class="product-image"><img src="${p.image}" alt="${p.name}"></div>
      <div class="product-detail">
        <span class="category">${p.category}</span>
        <h1>${p.name}</h1>
        <p class="desc">${p.description}</p>
        <div class="ref">Rupika reference · ${p.id}</div>
        <div class="order-box">
          <a class="btn" target="_blank" rel="noopener" href="https://wa.me/919642595973?text=${encodeURIComponent(`Hello Rupika Jewels, I am interested in ${p.name} (${p.id}). Please share availability and details.`)}">Enquire on WhatsApp <span>↗</span></a>
          <p class="order-note">For availability, pricing and delivery details, connect with Rupika Jewels directly on WhatsApp.</p>
        </div>
      </div>`;
  })
  .catch(() => {
    document.querySelector("#product").innerHTML = "<div class='empty-state'><h2>Catalogue unavailable.</h2><p>Please return to the shop and try again.</p></div>";
  });
